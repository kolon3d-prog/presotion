---
name: presotion-best-practices
description: Best practices for Presotion - Programmatic presentations in React
metadata:
  tags: presotion, presentation, slides, react, animation
---

## When to use

Use this skill whenever you are creating presentations with Presotion to obtain domain-specific knowledge.

## How to use

Read individual rule files for detailed explanations and code examples:

- [rules/presentations.md](rules/presentations.md) - Defining presentations, props, and metadata
- [rules/slides.md](rules/slides.md) - Creating slides with the Slide and Deck components
- [rules/fragments.md](rules/fragments.md) - Fragment animations and click-based reveals
- [rules/animations.md](rules/animations.md) - Animation patterns using interpolateFragment and spring
- [rules/timing.md](rules/timing.md) - Interpolation, easing, and spring configurations
- [rules/layouts.md](rules/layouts.md) - Built-in slide layouts (center, two-cols, cover, etc.)
- [rules/code-blocks.md](rules/code-blocks.md) - Syntax highlighting and code presentation
- [rules/transitions.md](rules/transitions.md) - Slide transitions (fade, slide, wipe)
- [rules/assets.md](rules/assets.md) - Using images and static files
- [rules/themes.md](rules/themes.md) - Theming and styling presentations
- [rules/parameters.md](rules/parameters.md) - Making presentations parametrizable with Zod
- [rules/exporting.md](rules/exporting.md) - Exporting to PDF, PPTX, and SPA

## Quick Start

```bash
# Create a new presentation
npx create-presotion my-talk
cd my-talk
npm install
npm run dev
```

## Core Concepts

| Concept | Description |
|---------|-------------|
| Presentation | Container defining metadata (width, height, slideCount) |
| Deck | Wrapper for sequential slides |
| Slide | Individual slide component |
| Fragment | Click-revealed content within a slide |
| useFragment() | Hook to get current fragment index |
| interpolateFragment() | Map fragment to animation values |
| spring() | Physics-based animations |
