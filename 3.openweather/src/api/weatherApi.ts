import axios from 'axios'
import type { WeatherData } from '../types/weather'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const weatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'kr',
  },
})

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const { data } = await weatherClient.get<WeatherData>('/weather', {
    params: { q: city },
  })
  return data
}
