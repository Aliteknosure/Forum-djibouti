# 🎨 Couleurs précédentes — Palette originale du projet

> Créé le 12 mars 2026 — Sauvegarde avant migration vers la charte graphique CLE

---

## Palette originale (Tailwind `tailwind.config.ts`)

| Token Tailwind | HEX | Description |
|---|---|---|
| `djibouti-navy` | `#1A3C6E` | Bleu marine Djibouti |
| `djibouti-green` | `#009A44` | Vert Djibouti (drapeau) |
| `djibouti-gold` | `#F5A623` | Or/Ambre |
| `djibouti-dark` | `#0D1B2A` | Fond sombre (bleu nuit) |

---

## Palette CLE (actuelle depuis le 12 mars 2026)

| Token Tailwind | HEX | Description |
|---|---|---|
| `cle-green` | `#0E706B` | Vert foncé institutionnel CLE |
| `cle-teal` | `#28BCB7` | Turquoise / vert clair CLE |
| `cle-black` | `#000000` | Noir |
| `djibouti-navy` | `→ #0E706B` | Redirigé vers `cle-green` |
| `djibouti-green` | `→ #0E706B` | Redirigé vers `cle-green` |
| `djibouti-gold` | `→ #28BCB7` | Redirigé vers `cle-teal` |
| `djibouti-dark` | `→ #0a1f1e` | Fond sombre calqué sur cle-green |

---

## Pour revenir à l'ancienne palette

Remplacer dans `tailwind.config.ts` le bloc `colors` par :

```ts
colors: {
  'djibouti-navy':  '#1A3C6E',
  'djibouti-green': '#009A44',
  'djibouti-gold':  '#F5A623',
  'djibouti-dark':  '#0D1B2A',
```

Et dans `src/app/globals.css`, remettre ces valeurs hardcodées :

| Propriété | Ancienne valeur | Nouvelle valeur (CLE) |
|---|---|---|
| Scroll progress | `#009A44` → `#F5A623` | `#0E706B` → `#28BCB7` |
| Scrollbar thumb | `#1A3C6E` | `#0E706B` |
| Scrollbar hover | `#009A44` | `#28BCB7` |
| Gradient text | `#F5A623` (50%) / `#009A44` (100%) | `#28BCB7` / `#0E706B` |
| Shape-1 bg | `#009A44` | `#0E706B` |
| Shape-2 bg | `#F5A623` | `#28BCB7` |
| Shape-3 bg | `#1A3C6E` | `#0a1f1e` |
| Shape-4 bg | `#F5A623` | `#28BCB7` |
| Hexagon bg | `#009A44` | `#0E706B` |
| `.btn-primary` bg | `#009A44` | `#0E706B` |
| `.btn-primary:hover` bg | `#007d38` | `#28BCB7` |
| `.btn-primary:hover` shadow | `rgba(0,154,68,0.4)` | `rgba(14,112,107,0.4)` |
| `form-input:focus` border | `#1A3C6E` | `#0E706B` |
| `form-input:focus` shadow | `rgba(26,60,110,0.1)` | `rgba(14,112,107,0.12)` |
| `form-input.valid` border | `#009A44` | `#0E706B` |
| Countdown accent | `rgba(0,154,68,...)` | `rgba(14,112,107,...)` |
| `::selection` bg | `rgba(0,154,68,0.3)` | `rgba(14,112,107,0.25)` |
| `::selection` color | `#0D1B2A` | `#0a1f1e` |
| `:focus-visible` outline | `#009A44` | `#0E706B` |

---

## Fichiers modifiés lors de la migration CLE

- `tailwind.config.ts` — couleurs redéfinies
- `src/app/globals.css` — toutes valeurs hardcodées
- `src/components/sections/HeroSection.tsx` — gradient fond + `via-cle-green`
- `src/components/sections/MinisterSection.tsx` — halo photo `from-cle-green via-cle-teal`, titre `via-cle-teal`
