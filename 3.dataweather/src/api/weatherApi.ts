import axios from 'axios';

const API_KEY = import.meta.env.VITE_DATAWEATHER_API_KEY;

export interface Region {
  name: string;
  nx: number;
  ny: number;
}

// 기상청 격자 좌표 (nx, ny) - 주요 지역
export const REGIONS: Region[] = [
  { name: '서울', nx: 60, ny: 127 },
  { name: '인천', nx: 55, ny: 124 },
  { name: '대전', nx: 67, ny: 100 },
  { name: '대구', nx: 89, ny: 90 },
  { name: '광주', nx: 58, ny: 74 },
  { name: '부산', nx: 98, ny: 76 },
  { name: '울산', nx: 102, ny: 84 },
  { name: '제주', nx: 52, ny: 38 },
];

export interface WeatherData {
  temperature: string; // T1H 기온 (℃)
  humidity: string; // REH 습도 (%)
  precipitation: string; // RN1 1시간 강수량 (mm)
  precipitationType: string; // PTY 강수형태
  baseDate: string;
  baseTime: string;
}

// 초단기실황 PTY(강수형태) 코드
const PTY_MAP: Record<string, string> = {
  '0': '없음',
  '1': '비',
  '2': '비/눈',
  '3': '눈',
  '5': '빗방울',
  '6': '빗방울눈날림',
  '7': '눈날림',
};

function getBaseDateTime() {
  const now = new Date();

  // 기상청 초단기실황은 매시 40분에 발표되므로, 40분 이전이면 이전 시간 정시를 기준으로 조회합니다.
  if (now.getMinutes() < 40) {
    now.setHours(now.getHours() - 1);
  }

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');

  return {
    baseDate: `${year}${month}${date}`, // YYYYMMDD
    baseTime: `${hours}00`, // HHmm
  };
}

interface WeatherItem {
  category: string;
  obsrValue: string;
}

export async function fetchWeather(nx: number, ny: number): Promise<WeatherData> {
  const { baseDate, baseTime } = getBaseDateTime();

  const response = await axios.get(
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst',
    {
      params: {
        serviceKey: API_KEY,
        pageNo: 1,
        numOfRows: 100,
        dataType: 'JSON', // XML이 기본이므로 반드시 JSON 명시
        base_date: baseDate,
        base_time: baseTime,
        nx,
        ny,
      },
    }
  );

  const items: WeatherItem[] | undefined = response.data?.response?.body?.items?.item;

  if (!items) {
    throw new Error('날씨 데이터를 찾을 수 없습니다.');
  }

  const findValue = (category: string) =>
    items.find((item) => item.category === category)?.obsrValue ?? '-';

  return {
    temperature: findValue('T1H'),
    humidity: findValue('REH'),
    precipitation: findValue('RN1'),
    precipitationType: PTY_MAP[findValue('PTY')] ?? '-',
    baseDate,
    baseTime,
  };
}
