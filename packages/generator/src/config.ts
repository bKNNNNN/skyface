import type { WeatherCondition } from '@skyface/core'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export interface GeneratorConfig {
  input: string
  output: string
  apiKey?: string
  variants: number
  conditions: Partial<Record<WeatherCondition, string>>
}

const CONFIG_FILENAME = 'skyface.config.json'

const DEFAULT_CONFIG: GeneratorConfig = {
  input: './avatar.png',
  output: './weather-avatars',
  variants: 5,
  conditions: {},
}

/**
 * Load config from skyface.config.json
 */
export function loadConfig(cwd: string = process.cwd()): GeneratorConfig {
  const configPath = resolve(cwd, CONFIG_FILENAME)

  if (!existsSync(configPath)) {
    throw new Error(
      `Config file not found: ${configPath}\nRun 'skyface init' to create one.`
    )
  }

  const raw = readFileSync(configPath, 'utf-8')
  const userConfig = JSON.parse(raw) as Partial<GeneratorConfig>

  // Resolve API key from env if placeholder
  let apiKey = userConfig.apiKey
  if (apiKey === '${GEMINI_API_KEY}' || !apiKey) {
    apiKey = process.env.GEMINI_API_KEY
  }

  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
    apiKey,
  }
}

/**
 * Generate default config content
 */
export function getDefaultConfigContent(): string {
  return JSON.stringify(
    {
      input: './avatar.png',
      output: './weather-avatars',
      apiKey: '${GEMINI_API_KEY}',
      variants: 5,
      conditions: {
        sunny: 'Same character, sunny day, warm lighting, happy mood',
        rain: 'Same character, rainy weather, umbrella, cozy mood',
        // Add more to customize...
      },
    },
    null,
    2
  )
}
