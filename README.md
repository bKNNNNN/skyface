# Skyface

Dynamic weather-based avatars for your website.

Your avatar changes based on real-time weather conditions - sunny, rainy, snowy, and more.

**[Live Demo](https://skyface-demo.vercel.app)** | **[GitHub](https://github.com/bKNNNNN/skyface)**

## How it works

1. **Generate** - Use our CLI to create avatar variants for each weather condition using AI (Gemini)
2. **Integrate** - Add the Skyface component to your site
3. **Done** - Your avatar now reflects the current weather at your location

## Quick Start

```bash
# Generate your avatars
npx @skyface/generator init
npx @skyface/generator generate

# Install the component
npm install @skyface/astro
```

```astro
---
import Skyface from '@skyface/astro/Skyface.astro'
// or for the stamp design:
import SkyfaceStamp from '@skyface/astro/SkyfaceStamp.astro'
---

<Skyface
  lat={48.8566}
  lon={2.3522}
  imagesPath="/weather-avatars"
  size="lg"
/>
```

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@skyface/core` | Weather logic (TypeScript, zero deps) | ✅ Ready |
| `@skyface/generator` | CLI to generate avatar variants | ✅ Ready |
| `@skyface/astro` | Astro component | ✅ Ready |
| `@skyface/react` | React component | 🚧 Coming soon |
| `@skyface/vue` | Vue component | 🚧 Coming soon |

## Weather Conditions

Skyface maps weather data to 9 conditions:

| Condition | When |
|-----------|------|
| Sunny | Clear sky during day |
| Clear Night | Clear sky at night |
| Cloudy | Overcast during day |
| Cloudy Night | Overcast at night |
| Rain | Drizzle, rain, showers |
| Snow | Snowfall |
| Fog | Foggy/misty |
| Thunderstorm | Thunder and lightning |
| Wind | Wind speed > 40 km/h |

## Generator

The generator uses Google's Gemini API (Nano Banana) to create consistent avatar variants.

### Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Create a new API key
3. Set it as an environment variable: `export GEMINI_API_KEY=your-key`

### Generate Avatars

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
    "rain": "Same character, rainy weather, umbrella"
  }
}
```

Customize the prompts to match your style, then:

```bash
npx @skyface/generator generate
```

This generates 9 conditions × N variants = 45 images (with default 5 variants).

## Components

### Skyface (Circle/Square)

Simple circular or square avatar.

```astro
<Skyface
  lat={48.8566}
  lon={2.3522}
  imagesPath="/weather-avatars"
  size="lg"        <!-- sm | md | lg | xl -->
  variant="circle" <!-- circle | square -->
/>
```

### SkyfaceStamp

Postage stamp design with perforated edges.

```astro
<SkyfaceStamp
  lat={48.8566}
  lon={2.3522}
  imagesPath="/weather-avatars"
  size="lg"
  variants={5}  <!-- number of image variants for click interaction -->
/>
```

**Interactions:**
- Click to cycle through image variants
- Shift+click for debug mode (cycle through all weather types)

## Requirements

- Node.js 18+
- Gemini API key (for generation only - free tier available)

## License

MIT
