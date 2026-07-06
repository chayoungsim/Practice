import { useEffect, useState } from 'react'
import { fetchWeatherByCity } from '../api/weatherApi'
import type { WeatherData } from '../types/weather'
import './WeatherBox.scss'

interface WeatherBoxProps {
  city: string
  label: string
  onRemove: () => void
}

function WeatherBox({ city, label, onRemove }: WeatherBoxProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // effect 언마운트 이후 상태 업데이트를 막기 위한 플래그
    let ignore = false

    fetchWeatherByCity(city)
      .then((data) => {
        if (ignore) return
        setWeather(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('날씨 정보를 가져오는 중 오류 발생', error)
        if (ignore) return
        setError('날씨 정보를 가져오는 중 오류가 발생했습니다.')
        setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [city])

  return (
    <div className="weather-box">
      <button className="close-button" onClick={onRemove} aria-label={`${label} 날씨 닫기`}>
        ✕
      </button>

      {isLoading && <div className="weather-status">날씨 정보를 불러오는 중...</div>}

      {!isLoading && (error || !weather) && (
        <div className="weather-status">{error ?? '날씨 정보가 없습니다.'}</div>
      )}

      {!isLoading && weather && (
        <>
          <div className="city">도시 : {label}</div>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div className="temp">온도 : {Math.round(weather.main.temp)}°C</div>
          <div className="feels-like">체감 온도 : {Math.round(weather.main.feels_like)}°C</div>
          <div className="humidity">습도 : {weather.main.humidity}%</div>
          <div className="description">설명 : {weather.weather[0].description}</div>
        </>
      )}
    </div>
  )
}

export default WeatherBox
