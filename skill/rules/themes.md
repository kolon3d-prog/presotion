---
name: themes
description: Theming and styling Presotion presentations
metadata:
  tags: themes, styling, colors, fonts
---

## Theme Configuration

Themes can be set at the Presentation level:

```tsx
<Presentation
  id="my-talk"
  component={MyTalk}
  slideCount={10}
  defaultProps={{
    theme: 'dark',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    fontFamily: 'Inter, sans-serif',
  }}
/>
```

## Built-in Themes

| Theme | Description |
|-------|-------------|
| `dark` | Dark background with light text |
| `light` | Light background with dark text |
| `corporate` | Professional blue theme |
| `minimal` | Clean, minimal styling |

## Custom Styling

### Inline Styles

All components accept `style` props:

```tsx
<DefaultLayout 
  style={{ 
    backgroundColor: '#1e1e1e', 
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
  }}
>
  <h2>Custom styled slide</h2>
</DefaultLayout>
```

### CSS Classes

Use `className` for external stylesheets:

```tsx
<CenterLayout className="my-custom-slide">
  <h1>Styled with CSS</h1>
</CenterLayout>
```

### CSS Variables

Define CSS variables for theming:

```css
:root {
  --presotion-bg: #1e1e1e;
  --presotion-text: #ffffff;
  --presotion-primary: #3B82F6;
  --presotion-secondary: #10B981;
}
```

```tsx
<DefaultLayout 
  style={{ 
    backgroundColor: 'var(--presotion-bg)',
    color: 'var(--presotion-text)',
  }}
>
```

## Typography

Set typography through styles:

```tsx
<h1 style={{ 
  fontSize: 72, 
  fontWeight: 700,
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
}}>
  Big Title
</h1>
```

## Best Practices

1. Define a consistent color palette
2. Use relative units for responsive sizing
3. Keep font choices minimal (2-3 max)
4. Ensure sufficient contrast for readability
5. Test on different screen sizes
