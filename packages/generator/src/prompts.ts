import type { WeatherCondition } from '@skyface/core'

/**
 * Default prompts for each weather condition
 * Users can customize these in skyface.config.json
 */
export const DEFAULT_PROMPTS: Record<WeatherCondition, string> = {
  sunny:
    'Same character in a sunny day setting. Warm golden lighting, clear blue sky. The character looks happy and relaxed. Maybe wearing sunglasses or a sun hat.',

  'clear-night':
    'Same character at night under a clear starry sky. Soft moonlight illuminating the scene. Peaceful and serene atmosphere. Stars visible in the background.',

  cloudy:
    'Same character on an overcast day. Soft diffused lighting, grey clouds in the sky. Neutral mood, perhaps wearing a light jacket.',

  'cloudy-night':
    'Same character at night with cloudy sky. Dim ambient lighting, clouds obscuring the moon. Cozy and contemplative atmosphere.',

  fog:
    'Same character in a foggy, misty environment. Low visibility, mysterious atmosphere. Soft ethereal lighting filtering through the fog.',

  rain:
    'Same character in rainy weather. Holding an umbrella or wearing a raincoat. Raindrops visible, puddles on the ground. Cozy rainy day mood.',

  snow:
    'Same character in snowy winter weather. Wearing warm winter clothes (scarf, beanie, coat). Snowflakes falling, white snowy background. Cozy winter atmosphere.',

  thunderstorm:
    'Same character during a thunderstorm. Dramatic lighting from lightning, dark stormy sky. Rain and wind visible. Intense but safe atmosphere.',

  wind:
    'Same character on a very windy day. Hair and clothes blowing in the wind. Leaves or papers flying around. Dynamic and energetic mood.',
}

/**
 * Get the prompt for a condition, with optional user override
 */
export function getPrompt(
  condition: WeatherCondition,
  customPrompts?: Partial<Record<WeatherCondition, string>>
): string {
  return customPrompts?.[condition] ?? DEFAULT_PROMPTS[condition]
}
