import type { WeatherData } from '../api/weatherApi';

interface WeatherBoxProps {
  regionName: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherBox = ({ regionName, weather, loading, error }: WeatherBoxProps) => {
  if (loading) {
    return <div className="weather-box">날씨 정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="weather-box weather-box--error">{error}</div>;
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="weather-box">
      <h2>{regionName}</h2>
      <p className="weather-box__temp">{weather.temperature}℃</p>
      <ul className="weather-box__detail">
        <li>습도 {weather.humidity}%</li>
        <li>강수형태 {weather.precipitationType}</li>
        <li>1시간 강수량 {weather.precipitation}mm</li>
      </ul>
      <p className="weather-box__time">
        기준시간 {weather.baseDate} {weather.baseTime}
      </p>
    </div>
  );
};

export default WeatherBox;
