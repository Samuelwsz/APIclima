export interface WeatherData {
  main: {
    temp: number
    humidity: number
  }
  weather: [
    {
      main: string
    }
  ]
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
  name: string
}
