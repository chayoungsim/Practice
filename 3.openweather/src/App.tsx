import { useState } from 'react'
import WeatherBox from './components/WeatherBox'
import './App.scss'

// 버튼으로 선택할 수 있는 지역 목록 (API 조회명 / 화면 표시명)
const CITIES = [
  { city: 'Seoul', label: '서울' },
  { city: 'Busan', label: '부산' },
  { city: 'Incheon', label: '인천' },
  { city: 'Daegu', label: '대구' },
  { city: 'Daejeon', label: '대전' },
  { city: 'Gwangju', label: '광주' },
]

function App() {
  const [selectedCities, setSelectedCities] = useState<string[]>([])

  function handleAddCity(city: string) {
    setSelectedCities((prev) => (prev.includes(city) ? prev : [...prev, city]))
  }

  function handleRemoveCity(city: string) {
    setSelectedCities((prev) => prev.filter((selected) => selected !== city))
  }

  return (
    <div className="app">
      <div className="city-buttons">
        {CITIES.map(({ city, label }) => (
          <button key={city} onClick={() => handleAddCity(city)}>
            {label}
          </button>
        ))}
      </div>

      <div className="weather-list">
        {selectedCities.map((city) => {
          const label = CITIES.find((item) => item.city === city)?.label ?? city
          return (
            <WeatherBox key={city} city={city} label={label} onRemove={() => handleRemoveCity(city)} />
          )
        })}
      </div>
    </div>
  )
}

export default App
