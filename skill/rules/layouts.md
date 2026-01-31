---
name: layouts
description: Built-in slide layouts for common presentation patterns
metadata:
  tags: layouts, center, two-cols, cover, image
---

Import layouts from `@presotion/layouts`:

```tsx
import {
  CenterLayout,
  DefaultLayout,
  TwoColsLayout,
  CoverLayout,
  ImageLayout,
  ImageRightLayout,
  QuoteLayout,
  SectionLayout,
} from '@presotion/layouts';
```

## Available Layouts

### CenterLayout

Content centered both horizontally and vertically.

```tsx
<CenterLayout>
  <h1>Centered Title</h1>
  <p>Centered content</p>
</CenterLayout>
```

### DefaultLayout

Content flows from top with padding.

```tsx
<DefaultLayout>
  <h2>Title</h2>
  <ul>
    <li>Point 1</li>
    <li>Point 2</li>
  </ul>
</DefaultLayout>
```

### TwoColsLayout

Split content into two columns.

```tsx
<TwoColsLayout
  left={<div>Left column</div>}
  right={<div>Right column</div>}
/>
```

### CoverLayout

Title slide with title, subtitle, and footer.

```tsx
<CoverLayout
  title="My Presentation"
  subtitle="An introduction to Presotion"
  footer="John Doe - 2024"
/>
```

### ImageLayout

Full-screen background image with overlay content.

```tsx
<ImageLayout src="/hero.jpg">
  <h1>Text over image</h1>
</ImageLayout>
```

### ImageRightLayout

Content on left, image on right.

```tsx
<ImageRightLayout src="/photo.jpg">
  <h2>Title</h2>
  <p>Description next to image</p>
</ImageRightLayout>
```

### QuoteLayout

Large quote with attribution.

```tsx
<QuoteLayout
  quote="The best way to predict the future is to create it."
  author="Peter Drucker"
/>
```

### SectionLayout

Section divider with large title.

```tsx
<SectionLayout
  title="Part 1"
  subtitle="Introduction"
  background="#3b82f6"
/>
```

## Custom Styling

All layouts accept `style` and `className` props:

```tsx
<CenterLayout 
  style={{ backgroundColor: '#1e1e1e', color: '#fff' }}
  className="my-custom-slide"
>
  <h1>Custom styled</h1>
</CenterLayout>
```
