import { getAllConditions, type WeatherCondition } from '@skyface/core'
import { getPrompt } from './prompts'
import type { GeneratorConfig } from './config'

export interface GenerateOptions {
  config: GeneratorConfig
  onProgress?: (condition: WeatherCondition, variant: number, total: number) => void
  onError?: (condition: WeatherCondition, variant: number, error: Error) => void
}

/**
 * Generate all avatar variants for all conditions
 *
 * TODO: Implement Gemini API integration
 */
export async function generateAvatars(options: GenerateOptions): Promise<void> {
  const { config, onProgress } = options
  const conditions = getAllConditions()
  const total = conditions.length * config.variants

  let current = 0

  for (const condition of conditions) {
    const prompt = getPrompt(condition, config.conditions)

    for (let variant = 1; variant <= config.variants; variant++) {
      current++
      onProgress?.(condition, variant, total)

      // TODO: Call Gemini API with prompt and input image
      // TODO: Save generated image to output folder
      // Filename: {condition}.png, {condition}-2.png, etc.

      await generateSingleAvatar({
        condition,
        variant,
        prompt,
        inputPath: config.input,
        outputDir: config.output,
        apiKey: config.apiKey!,
      })
    }
  }
}

interface GenerateSingleOptions {
  condition: WeatherCondition
  variant: number
  prompt: string
  inputPath: string
  outputDir: string
  apiKey: string
}

async function generateSingleAvatar(options: GenerateSingleOptions): Promise<void> {
  const { condition, variant } = options

  // TODO: Implement actual Gemini API call
  // For now, just a placeholder

  const filename = variant === 1 ? `${condition}.png` : `${condition}-${variant}.png`

  console.log(`  Would generate: ${filename}`)
  console.log(`  Prompt: ${options.prompt.substring(0, 50)}...`)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
}
