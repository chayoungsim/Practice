// OpenWeatherMap API 응답 중 화면에 필요한 부분만 정의
export interface WeatherData {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: {
    main: string
    description: string
    icon: string
  }[]
}
