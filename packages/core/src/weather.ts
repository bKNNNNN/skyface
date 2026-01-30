import type { WeatherData, OpenMeteoResponse } from './types'

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * Fetch current weather data from Open-Meteo API
 */
export async function fetchWeather(options: {
  lat: number
  lon: number
}): Promise<WeatherData> {
  const { lat, lon } = options

  const url = new URL(OPEN_METEO_URL)
  url.searchParams.set('latitude', lat.toString())
  url.searchParams.set('longitude', lon.toString())
  url.searchParams.set('current', 'weather_code,is_day,wind_speed_10m,temperature_2m')

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.status}`)
  }

  const data: OpenMeteoResponse = await response.json()

  return {
    weatherCode: data.current.weather_code,
    isDay: data.current.is_day === 1,
    windSpeed: data.current.wind_speed_10m,
    temperature: data.current.temperature_2m,
  }
}
