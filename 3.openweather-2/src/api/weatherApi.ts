import axios from "axios";
import type { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

//1. 공통 설정을 기본 탑재한 복사본(인스턴스)를 만든다.
const weatherClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: API_KEY,
        units: 'metric',
        lang: 'kr'
    }
})

//2. weatherClient' 뒤에 .get을 붙여서 가볍게 요청
export async function fetchWeatherByCity(city:string): Promise<WeatherData> {
    const {data} = await weatherClient.get<WeatherData>('/weather',{
        params: {q:city}
    })
    return data
}