# Skyface

Dynamic weather-based avatars for your website.

Your avatar changes based on real-time weather conditions - sunny, rainy, snowy, and more.

## How it works

1. **Generate** - Use our CLI to create avatar variants for each weather condition using AI
2. **Integrate** - Add the Skyface component to your site
3. **Done** - Your avatar now reflects the current weather at your location

## Quick Start

```bash
# Generate your avatars
npx @skyface/generator init
npx @skyface/generator generate

# Install the component (pick your framework)
npm install @skyface/astro  # or @skyface/react, @skyface/vue
```

```astro
---
import { Skyface } from '@skyface/astro'
---

<Skyface
  lat={48.8566}
  lon={2.3522}
  imagesPath="/weather-avatars"
  size="lg"
/>
```

## Packages

| Package | Description |
|---------|-------------|
| `@skyface/core` | Weather logic (TypeScript, zero deps) |
| `@skyface/generator` | CLI to generate avatar variants |
| `@skyface/astro` | Astro component |
| `@skyface/react` | React component |
| `@skyface/vue` | Vue component |

## Weather Conditions

Skyface maps weather data to 9 conditions:

- Sunny / Clear Night
- Cloudy / Cloudy Night
- Rain
- Snow
- Fog
- Thunderstorm
- Wind (>40 km/h)

## Generator

The generator uses Google's Gemini API to create consistent avatar variants:

```bash
npx @skyface/generator init
```

This creates `skyface.config.json`:

```json
{
  "input": "./my-avatar.png",
  "output": "./weather-avatars",
  "variants": 5,
  "conditions": {
    "sunny": "Same character, sunny day, warm lighting",
    "rain": "Same character, rainy weather, umbrella",
    ...
  }
}
```

Customize the prompts to match your style, then:

```bash
export GEMINI_API_KEY=your-key
npx @skyface/generator generate
```

## Requirements

- Node.js 18+
- Gemini API key (for generation only)

## License

MIT
