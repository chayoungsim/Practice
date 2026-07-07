import { useEffect, useState} from 'react'
import { fetchWeatherByCity } from "../api/weatherApi"
import type { WeatherData } from "../types/weather"
import './WeatherBox.scss'

interface WeatherBoxProps {
    city: string
    label: string
}



const WeatherBox = ({city, label} : WeatherBoxProps) => {

    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        fetchWeatherByCity(city)
            .then((data) => {
                setWeather(data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('날씨 정보를 가져오는 중 오류 발생',error)
                setError('날씨 정보를 가져오는 중 오류가 발생했습니다.')
                setIsLoading(false)
            })

    },[city])

  if (isLoading) {
    return <div>날씨 정보를 불러오는 중...</div>
  }

  if (error || !weather) {
    return <div>{error ?? '날씨 정보를 불러올 수 없습니다.'}</div>
  }

  return (
    <div>
        <div className="city">도시 : {label}</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
        <div className="temp">온도 : {weather.main.temp}°C</div>
        <div className="feels-like">체감 온도 :{weather.main.feels_like}</div>
        <div className="humidity">습도 : {weather.main.humidity}</div>
        <div className="description">설명 : {weather.weather[0].description}</div>
    </div>
  )
}

export default WeatherBox