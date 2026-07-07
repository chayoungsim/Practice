import { useState } from 'react'

import WeatherBox from './components/WeatherBox'
import './App.scss'

const CITIES = [
  { city: 'Seoul', label: '서울' },
  { city: 'Busan', label: '부산' },
  { city: 'Incheon', label: '인천' },
  { city: 'Daegu', label: '대구' },
  { city: 'Daejeon', label: '대전' },
  { city: 'Gwangju', label: '광주' },
]


function App() {

  const [selectedCity, setSelectedCity] = useState<string>('Seoul')

  const selectedLabel = CITIES.find((item) => item.city === selectedCity)?.label ?? selectedCity

  return (
    <>
      <div className="city-buttons">
        {CITIES.map(({ city, label }) => (
          <button
            key={city}
            type="button"
            className={city === selectedCity ? 'active' : ''}
            onClick={() => setSelectedCity(city)}
          >
            {label}
          </button>
        ))}
      </div>
      <WeatherBox key={selectedCity} city={selectedCity} label={selectedLabel} />
    </>
  )
}

export default App
