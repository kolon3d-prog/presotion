# Presotion

**Programmatic presentations in React** - like Remotion, but for slides.

Presotion lets you create presentations using React components with fragment-based animations, AI agent integration via MCP, and export to PDF/PPTX.

## Features

- **React-based slides** - Create presentations with JSX and TypeScript
- **Fragment animations** - Click-driven reveals with spring physics
- **AI agent integration** - MCP server for Claude, Cursor, and other AI tools
- **Multiple layouts** - Pre-built layouts (center, two-cols, cover, quote, etc.)
- **Code highlighting** - Syntax highlighting with Shiki
- **Slide transitions** - Fade, slide, wipe, flip transitions
- **Export options** - PDF, PPTX, and SPA export

## Quick Start

```bash
npx create-presotion my-talk
cd my-talk
npm install
npm run dev
```

## Core Concepts

### Presentations and Slides

```tsx
import { Deck, FragmentList } from '@presotion/core';
import { CoverLayout, DefaultLayout } from '@presotion/layouts';

export const MyPresentation = () => {
  return (
    <Deck>
      <Deck.Slide fragmentCount={1}>
        <CoverLayout
          title="My Presentation"
          subtitle="Created with Presotion"
        />
      </Deck.Slide>

      <Deck.Slide fragmentCount={3}>
        <DefaultLayout>
          <h2>Key Points</h2>
          <FragmentList>
            <p>First point</p>
            <p>Second point</p>
            <p>Third point</p>
          </FragmentList>
        </DefaultLayout>
      </Deck.Slide>
    </Deck>
  );
};
```

### Fragment Animations

All animations are driven by the `useFragment()` hook:

```tsx
import { useFragment, interpolateFragment, spring } from '@presotion/core';

const MyComponent = () => {
  const fragment = useFragment();

  const opacity = interpolateFragment(fragment, [0, 2], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = spring({ fragment, config: { damping: 200 } });

  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>
      Animated content
    </div>
  );
};
```

### Code Blocks

```tsx
import { CodeBlock } from '@presotion/code';

<CodeBlock
  language="typescript"
  showLineNumbers
  highlightLines={(fragment) => {
    if (fragment === 0) return [];
    if (fragment === 1) return [1, 2];
    return 'all';
  }}
>
{`const greeting = 'Hello';
console.log(greeting);`}
</CodeBlock>
```

### Slide Transitions

```tsx
import { TransitionDeck, linearTiming } from '@presotion/transitions';
import { fade } from '@presotion/transitions/fade';
import { slide } from '@presotion/transitions/slide';

<TransitionDeck>
  <TransitionDeck.Slide>
    <SlideA />
  </TransitionDeck.Slide>
  
  <TransitionDeck.Transition
    presentation={fade()}
    timing={linearTiming({ durationMs: 300 })}
  />
  
  <TransitionDeck.Slide>
    <SlideB />
  </TransitionDeck.Slide>
</TransitionDeck>
```

## Packages

| Package | Description |
|---------|-------------|
| `@presotion/core` | Core primitives (Presentation, Slide, Deck, hooks) |
| `@presotion/player` | Embed presentations in any React app |
| `@presotion/transitions` | Slide transition effects |
| `@presotion/code` | Syntax-highlighted code blocks |
| `@presotion/layouts` | Pre-built slide layouts |
| `@presotion/renderer` | Export to PDF/PPTX/SPA |
| `@presotion/cli` | CLI for creating and managing projects |
| `@presotion/mcp` | MCP server for AI agents |

## AI Agent Integration

Presotion includes an MCP server that allows AI agents to create and modify presentations:

```json
{
  "mcpServers": {
    "presotion": {
      "command": "npx",
      "args": ["@presotion/mcp"]
    }
  }
}
```

Available tools:
- `create_presentation` - Create a new presentation
- `add_slide` - Add a slide
- `update_slide` - Update slide content
- `remove_slide` - Remove a slide
- `set_theme` - Change theme and colors
- `preview_slide` - Get slide preview
- `generate_code` - Generate React code

## Export

```bash
# Export to PDF
npx presotion export --format pdf --output slides.pdf

# Export to PPTX
npx presotion export --format pptx --output slides.pptx

# Build as static SPA
npx presotion build
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `→` / `Space` | Next fragment/slide |
| `←` / `Backspace` | Previous fragment/slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |

## License

MIT
