import type { WeatherCondition, WeatherData } from './types'

export type { WeatherCondition }

const WIND_THRESHOLD = 40 // km/h

/**
 * Map weather data to a Skyface condition
 *
 * Priority order:
 * 1. Wind (if > 40 km/h)
 * 2. Thunderstorm (codes 95-99)
 * 3. Snow (codes 71-77, 85-86)
 * 4. Rain (codes 51-67, 80-82)
 * 5. Fog (codes 45-48)
 * 6. Cloudy (code 3)
 * 7. Clear/Sunny (codes 0-2)
 */
export function getWeatherCondition(weather: WeatherData): WeatherCondition {
  const { weatherCode, isDay, windSpeed } = weather

  // Wind takes priority
  if (windSpeed > WIND_THRESHOLD) {
    return 'wind'
  }

  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) {
    return 'thunderstorm'
  }

  // Snow
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    (weatherCode >= 85 && weatherCode <= 86)
  ) {
    return 'snow'
  }

  // Rain (including drizzle and showers)
  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return 'rain'
  }

  // Fog
  if (weatherCode >= 45 && weatherCode <= 48) {
    return 'fog'
  }

  // Cloudy (overcast)
  if (weatherCode === 3) {
    return isDay ? 'cloudy' : 'cloudy-night'
  }

  // Clear or partly cloudy (codes 0, 1, 2)
  return isDay ? 'sunny' : 'clear-night'
}

/**
 * Get all available weather conditions
 */
export function getAllConditions(): WeatherCondition[] {
  return [
    'sunny',
    'clear-night',
    'cloudy',
    'cloudy-night',
    'fog',
    'rain',
    'snow',
    'thunderstorm',
    'wind',
  ]
}

/**
 * Get human-readable label for a condition
 */
export function getConditionLabel(
  condition: WeatherCondition,
  locale: 'en' | 'fr' = 'en'
): string {
  const labels: Record<WeatherCondition, { en: string; fr: string }> = {
    sunny: { en: 'Sunny', fr: 'Ensoleillé' },
    'clear-night': { en: 'Clear Night', fr: 'Nuit claire' },
    cloudy: { en: 'Cloudy', fr: 'Nuageux' },
    'cloudy-night': { en: 'Cloudy Night', fr: 'Nuit nuageuse' },
    fog: { en: 'Foggy', fr: 'Brumeux' },
    rain: { en: 'Rainy', fr: 'Pluvieux' },
    snow: { en: 'Snowy', fr: 'Neigeux' },
    thunderstorm: { en: 'Thunderstorm', fr: 'Orageux' },
    wind: { en: 'Windy', fr: 'Venteux' },
  }

  return labels[condition][locale]
}
