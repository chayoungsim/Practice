import { useEffect, useState } from 'react';
import { fetchWeather, REGIONS, type Region, type WeatherData } from './api/weatherApi';
import WeatherBox from './components/WeatherBox';
import './App.css';

function App() {
  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 지역이 바뀌면 렌더링 중에 상태를 초기화합니다. (effect 안에서 setState를 바로 호출하면
  // 렌더 -> 커밋 -> effect -> setState 로 이어지는 불필요한 추가 렌더링이 발생하기 때문입니다.)
  const [prevRegion, setPrevRegion] = useState(selectedRegion);
  if (prevRegion !== selectedRegion) {
    setPrevRegion(selectedRegion);
    setWeather(null);
    setError(null);
    setLoading(true);
  }

  useEffect(() => {
    let ignore = false;

    fetchWeather(selectedRegion.nx, selectedRegion.ny)
      .then((data) => {
        if (!ignore) setWeather(data);
      })
      .catch(() => {
        if (!ignore) setError('날씨 정보를 불러오지 못했습니다.');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [selectedRegion]);

  return (
    <div className="weather-app">
      <h1>오늘의 날씨</h1>

      <div className="region-buttons">
        {REGIONS.map((region) => (
          <button
            key={region.name}
            className={region.name === selectedRegion.name ? 'active' : ''}
            onClick={() => setSelectedRegion(region)}
          >
            {region.name}
          </button>
        ))}
      </div>

      <WeatherBox
        regionName={selectedRegion.name}
        weather={weather}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
