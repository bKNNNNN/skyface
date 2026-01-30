# Plan : Créer Skyface - Weather Avatar Open Source

## Vision

**Skyface** est un système open source pour créer des avatars dynamiques qui changent selon la météo. Il permet à n'importe qui de :
1. Générer des variantes de son avatar pour chaque condition météo via IA (Gemini/Nano Banana)
2. Intégrer un composant météo sur son site qui affiche l'avatar correspondant

---

## Architecture

```
skyface/
├── packages/
│   ├── core/           # Logique météo pure (TypeScript)
│   ├── generator/      # CLI de génération d'avatars
│   ├── astro/          # Composant Astro
│   ├── react/          # Composant React
│   └── vue/            # Composant Vue
├── apps/
│   └── demo/           # Site de démo
├── docs/               # Documentation
└── examples/           # Exemples d'intégration
```

---

## Packages

### 1. `@skyface/core`

**Responsabilité** : Logique métier pure, sans UI

- Mapping des weather codes Open-Meteo → 9 conditions (sunny, cloudy, rain, snow, fog, thunderstorm, wind, clear-night, cloudy-night)
- Wrapper Open-Meteo avec coordonnées configurables
- Types TypeScript
- Zero dependencies

```typescript
// API envisagée
import { getWeatherCondition, fetchWeather } from '@skyface/core'

const weather = await fetchWeather({ lat: 48.8566, lon: 2.3522 })
const condition = getWeatherCondition(weather) // 'sunny' | 'rain' | ...
```

### 2. `@skyface/generator`

**Responsabilité** : CLI pour générer les variantes d'avatar

**Workflow utilisateur** :
```bash
npx @skyface/generator init          # Crée skyface.config.json
npx @skyface/generator generate      # Génère toutes les variantes
```

**Configuration** (`skyface.config.json`) :
```json
{
  "input": "./my-avatar.png",
  "output": "./weather-avatars",
  "apiKey": "${GEMINI_API_KEY}",
  "variants": 5,
  "conditions": {
    "sunny": "Same character, sunny day, warm lighting, maybe sunglasses or sun hat",
    "rain": "Same character, rainy weather, umbrella or raincoat, water drops",
    "snow": "Same character, snowy weather, winter clothes, snowflakes",
    "fog": "Same character, foggy atmosphere, mysterious mood",
    "thunderstorm": "Same character, stormy weather, dramatic lighting",
    "wind": "Same character, windy day, hair blowing, leaves flying",
    "cloudy": "Same character, overcast day, neutral lighting",
    "clear-night": "Same character, night time, stars, moon lighting",
    "cloudy-night": "Same character, cloudy night, dim lighting"
  }
}
```

**Features** :
- Prompts par défaut intelligents (personnalisables)
- BYOK (Bring Your Own Key) pour Gemini
- Progress bar pendant la génération
- Retry automatique en cas d'échec
- Mode dry-run pour preview les prompts

### 3. `@skyface/astro`

**Responsabilité** : Composant Astro prêt à l'emploi

```astro
---
import { Skyface } from '@skyface/astro'
---

<Skyface
  lat={48.8566}
  lon={2.3522}
  imagesPath="/weather-avatars"
  size="lg"
  variant="stamp" <!-- ou "circle", "square" -->
/>
```

**Variantes de design** :
- `circle` : Avatar circulaire simple
- `square` : Avatar carré avec coins arrondis
- `stamp` : Design timbre postal (ton design actuel)

### 4. `@skyface/react` et `@skyface/vue`

Même API que Astro, adaptée au framework.

---

## Site de démo (`apps/demo`)

- Landing page expliquant le concept
- Démo interactive avec différentes villes
- Générateur en ligne (optionnel, si on veut offrir ça sans CLI)
- Galerie d'exemples de la communauté
- Documentation intégrée

---

## Étapes d'implémentation

### Phase 1 : Foundation
1. [ ] Créer le monorepo avec pnpm workspaces
2. [ ] Setup TypeScript, ESLint, Prettier
3. [ ] Implémenter `@skyface/core`
4. [ ] Tests unitaires pour le mapping météo

### Phase 2 : Générateur
5. [ ] Créer le CLI `@skyface/generator`
6. [ ] Intégration API Gemini
7. [ ] Commandes `init` et `generate`
8. [ ] Prompts par défaut optimisés

### Phase 3 : Composants
9. [ ] Extraire et adapter `@skyface/astro` depuis ton code actuel
10. [ ] Créer `@skyface/react`
11. [ ] Créer `@skyface/vue`

### Phase 4 : Documentation & Demo
12. [ ] Site de démo
13. [ ] Documentation complète
14. [ ] README avec examples
15. [ ] Contribution guidelines

### Phase 5 : Launch
16. [ ] Publier sur npm
17. [ ] Post sur Twitter/X, Reddit, Hacker News
18. [ ] Créer un thread de démo

---

## Décisions

- **Licence** : MIT
- **Monorepo** : pnpm workspaces (simple, efficace)
- **Approche** : Nouveau repo from scratch (pas d'extraction)

---

## Vérification

Pour valider que le projet fonctionne end-to-end :

1. **Core** : Tests unitaires passent, mapping météo correct
2. **Generator** :
   - `npx @skyface/generator init` crée le config
   - `npx @skyface/generator generate` génère les images
3. **Composants** : Le composant affiche le bon avatar selon la météo
4. **Demo** : Le site fonctionne et montre le concept

---

## Fichiers critiques à créer

- `packages/core/src/index.ts` - Export principal
- `packages/core/src/weather.ts` - Mapping et fetch
- `packages/generator/src/cli.ts` - Point d'entrée CLI
- `packages/generator/src/gemini.ts` - Intégration Gemini
- `packages/astro/src/Skyface.astro` - Composant principal
