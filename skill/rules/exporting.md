---
name: exporting
description: Exporting presentations to PDF, PPTX, and SPA
metadata:
  tags: export, pdf, pptx, html, build
---

## CLI Export

Use the Presotion CLI to export presentations:

```bash
# Export to PDF
npx presotion export --format pdf --output slides.pdf

# Export to PPTX
npx presotion export --format pptx --output slides.pptx

# Build as SPA
npx presotion build
```

## Programmatic Export

Use `@presotion/renderer` for programmatic export:

```tsx
import { renderPresentation, exportToPdf, exportToPptx } from '@presotion/renderer';

// Render to HTML string
const html = await renderPresentation({
  compositionId: 'my-talk',
  inputProps: { theme: 'dark' },
});

// Export to PDF
await exportToPdf({
  compositionId: 'my-talk',
  outputPath: 'presentation.pdf',
  width: 1920,
  height: 1080,
});

// Export to PPTX
await exportToPptx({
  compositionId: 'my-talk',
  outputPath: 'presentation.pptx',
});
```

## Build for Hosting

Build the presentation as a static SPA:

```bash
npm run build
```

This creates a `dist/` folder that can be deployed to any static hosting:
- Vercel
- Netlify
- GitHub Pages
- Any web server

## PDF Export Options

| Option | Type | Description |
|--------|------|-------------|
| `outputPath` | string | Output file path |
| `width` | number | Width in pixels |
| `height` | number | Height in pixels |
| `slides` | number[] | Specific slides to export (optional) |
