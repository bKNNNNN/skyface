import { GoogleGenAI } from '@google/genai'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getAllConditions, type WeatherCondition } from '@skyface/core'
import { getPrompt } from './prompts.js'
import type { GeneratorConfig } from './config.js'

export interface GenerateOptions {
  config: GeneratorConfig
  onProgress?: (condition: WeatherCondition, variant: number, total: number) => void
  onError?: (condition: WeatherCondition, variant: number, error: Error) => void
}

export interface GenerateResult {
  generated: number
  failed: number
  errors: Array<{ condition: WeatherCondition; variant: number; error: string }>
}

/**
 * Generate all avatar variants for all conditions using Gemini
 */
export async function generateAvatars(options: GenerateOptions): Promise<GenerateResult> {
  const { config, onProgress, onError } = options
  const conditions = getAllConditions()
  const total = conditions.length * config.variants

  const result: GenerateResult = {
    generated: 0,
    failed: 0,
    errors: [],
  }

  // Initialize Gemini client
  const ai = new GoogleGenAI({ apiKey: config.apiKey })

  // Read input image
  const imageData = readFileSync(config.input)
  const base64Image = imageData.toString('base64')
  const mimeType = getMimeType(config.input)

  for (const condition of conditions) {
    const basePrompt = getPrompt(condition, config.conditions)

    for (let variant = 1; variant <= config.variants; variant++) {
      onProgress?.(condition, variant, total)

      try {
        // Add variation instruction for variants > 1
        const prompt =
          variant === 1
            ? basePrompt
            : `${basePrompt} Create a unique variation, different pose or angle, variation number ${variant}.`

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: [
            { text: prompt },
            { inlineData: { mimeType, data: base64Image } },
          ],
        })

        // Extract and save the generated image
        const parts = response.candidates?.[0]?.content?.parts
        if (!parts) {
          throw new Error('No response parts received')
        }

        let imageSaved = false
        for (const part of parts) {
          if (part.inlineData?.data) {
            const buffer = Buffer.from(part.inlineData.data, 'base64')
            const filename =
              variant === 1 ? `${condition}.png` : `${condition}-${variant}.png`
            const outputPath = join(config.output, filename)
            writeFileSync(outputPath, buffer)
            imageSaved = true
            break
          }
        }

        if (!imageSaved) {
          throw new Error('No image data in response')
        }

        result.generated++
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        result.failed++
        result.errors.push({ condition, variant, error: errorMessage })
        onError?.(condition, variant, error as Error)
      }

      // Rate limiting - avoid hitting API limits
      await sleep(500)
    }
  }

  return result
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getMimeType(filePath: string): string {
  const ext = filePath.toLowerCase().split('.').pop()
  const mimeTypes: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif',
  }
  return mimeTypes[ext || ''] || 'image/png'
}
