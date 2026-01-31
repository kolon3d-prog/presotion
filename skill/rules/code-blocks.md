---
name: code-blocks
description: Syntax highlighting and code presentation with CodeBlock
metadata:
  tags: code, syntax, highlighting, shiki
---

Use the `<CodeBlock>` component from `@presotion/code` for syntax-highlighted code.

```tsx
import { CodeBlock } from '@presotion/code';

<CodeBlock language="typescript" showLineNumbers>
{`const greeting = 'Hello';
console.log(greeting);`}
</CodeBlock>
```

## Line Highlighting

Highlight specific lines:

```tsx
<CodeBlock 
  language="typescript" 
  highlightLines={[2, 3]}
>
{`const a = 1;
const b = 2;
const c = a + b;`}
</CodeBlock>
```

## Fragment-Based Highlighting

Change highlighted lines based on fragment:

```tsx
<CodeBlock
  language="typescript"
  highlightLines={(fragment) => {
    if (fragment === 0) return [];
    if (fragment === 1) return [1, 2];
    if (fragment === 2) return [4, 5];
    return 'all';
  }}
>
{`const a = 1;
const b = 2;

function add() {
  return a + b;
}`}
</CodeBlock>
```

## Animated Line Reveal

Reveal lines sequentially per fragment:

```tsx
<CodeBlock
  language="typescript"
  animateLines={[1, 2, 3, 4]}
>
{`const a = 1;
const b = 2;
const c = 3;
const sum = a + b + c;`}
</CodeBlock>
```

Lines specified in `animateLines` will appear one by one as fragments advance.

## Props Reference

| Prop | Type | Description |
|------|------|-------------|
| `children` | string | The code to display |
| `language` | string | Programming language (e.g., 'typescript', 'python') |
| `theme` | string | Color theme. Default: 'github-dark' |
| `showLineNumbers` | boolean | Show line numbers. Default: false |
| `highlightLines` | number[] \| function | Lines to highlight |
| `animateLines` | number[] | Lines to reveal per fragment |
| `fontSize` | number | Font size in pixels. Default: 16 |
