/**
 * Weather conditions supported by Skyface
 */
export type WeatherCondition =
  | 'sunny'
  | 'clear-night'
  | 'cloudy'
  | 'cloudy-night'
  | 'fog'
  | 'rain'
  | 'snow'
  | 'thunderstorm'
  | 'wind'

/**
 * Raw weather data from Open-Meteo API
 */
export interface WeatherData {
  weatherCode: number
  isDay: boolean
  windSpeed: number
  temperature?: number
}

/**
 * Configuration for Skyface components
 */
export interface SkyfaceConfig {
  lat: number
  lon: number
  imagesPath: string
  variants?: number
}

/**
 * Open-Meteo API response structure
 */
export interface OpenMeteoResponse {
  current: {
    weather_code: number
    is_day: number
    wind_speed_10m: number
    temperature_2m?: number
  }
}
