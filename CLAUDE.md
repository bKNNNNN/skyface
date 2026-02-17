# Skyface

Dynamic weather-based avatars for your website.

## Project Overview

Skyface lets anyone create avatars that change based on real-time weather. Users generate avatar variants for each weather condition using AI (Gemini/Nano Banana), then integrate a component on their site.

## Architecture

```
skyface/
├── packages/
│   ├── core/           # Pure TypeScript weather logic
│   ├── generator/      # CLI for avatar generation
│   ├── astro/          # Astro component
│   ├── react/          # React component
│   └── vue/            # Vue component
├── apps/
│   └── demo/           # Demo website
└── docs/               # Documentation
```

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Language**: TypeScript
- **Weather API**: Open-Meteo (free, no API key)
- **AI Generation**: Google Gemini API (BYOK - Bring Your Own Key)
- **Frameworks**: Astro, React, Vue
- **License**: MIT

## Packages

### @skyface/core
Pure logic, zero dependencies:
- Weather code mapping (Open-Meteo codes → 9 conditions)
- Configurable coordinates (any city)
- TypeScript types

### @skyface/generator
CLI tool:
- `npx @skyface/generator init` - Creates config file
- `npx @skyface/generator generate` - Generates all variants
- BYOK for Gemini API
- Customizable prompts per condition

### @skyface/astro, @skyface/react, @skyface/vue
Ready-to-use components with variants: circle, square, stamp (postage stamp design)

## Weather Conditions (9 types)

| Condition | Open-Meteo Codes | Day/Night |
|-----------|------------------|-----------|
| sunny | 0, 1, 2 | Day only |
| clear-night | 0, 1, 2 | Night only |
| cloudy | 3 | Day only |
| cloudy-night | 3 | Night only |
| fog | 45, 48 | Both |
| rain | 51-67, 80-82 | Both |
| snow | 71-77, 85-86 | Both |
| thunderstorm | 95-99 | Both |
| wind | Any + wind > 40km/h | Both |

## Code Guidelines

- All code in English (variables, functions, comments)
- TypeScript strict mode
- No dependencies in @skyface/core
- Each package must work independently

## Key Files

- `packages/core/src/weather.ts` - Weather mapping logic
- `packages/core/src/types.ts` - Shared types
- `packages/generator/src/cli.ts` - CLI entry point
- `packages/generator/src/gemini.ts` - Gemini API integration
- `packages/generator/src/prompts.ts` - Default prompts per condition

## Generator Config Schema

```json
{
  "input": "./avatar.png",
  "output": "./weather-avatars",
  "apiKey": "${GEMINI_API_KEY}",
  "variants": 5,
  "conditions": {
    "sunny": "Same character, sunny day, warm lighting...",
    "rain": "Same character, rainy weather, umbrella...",
    // ... other conditions
  }
}
```

## Commands

```bash
pnpm install          # Install all dependencies
pnpm build            # Build all packages
pnpm test             # Run tests
pnpm dev              # Dev mode for demo site
```

## Reference Implementation

The original implementation exists in `/home/pierrick/Documents/claude-apps/personal-website`:
- `src/components/ui/WeatherAvatar.astro` - Simple SSR component
- `src/components/ui/StampAvatar.astro` - Interactive stamp design
- `public/weather-avatars/` - 45 generated images (9 conditions × 5 variants)

---

## Workflow

- **Branch**: `<type>/<issue-number>-<description>` from `main`
- **Commit**: `<type>: <description>` (English, lowercase, max 72 chars)
- **PR**: Link with `Closes #XX`, squash merge, delete branch
- **Board**: Issues tracked in GitHub Project "claude-apps"
- **Labels**: `/setup-labels` to configure, `type/*` + `size/*` required per issue
