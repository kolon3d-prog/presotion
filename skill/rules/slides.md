---
name: slides
description: Creating slides with the Slide and Deck components
metadata:
  tags: slide, deck, sequence, timing
---

## Using Deck (Recommended)

Use `<Deck>` when slides should play one after another. It automatically calculates positions.

```tsx
import { Deck } from '@presotion/core';

export const MyTalk = () => {
  return (
    <Deck>
      <Deck.Slide fragmentCount={3}>
        <IntroSlide />
      </Deck.Slide>
      <Deck.Slide fragmentCount={5}>
        <MainContent />
      </Deck.Slide>
      <Deck.Slide fragmentCount={2}>
        <Conclusion />
      </Deck.Slide>
    </Deck>
  );
};
```

## Using Slide Directly

Use `<Slide>` when you need explicit control over positioning:

```tsx
import { Slide } from '@presotion/core';

export const MyTalk = () => {
  return (
    <>
      <Slide from={0} fragmentCount={3}>
        <IntroSlide />
      </Slide>
      <Slide from={1} fragmentCount={5}>
        <MainContent />
      </Slide>
      <Slide from={2} fragmentCount={2}>
        <Conclusion />
      </Slide>
    </>
  );
};
```

## Slide Props

| Prop | Type | Description |
|------|------|-------------|
| `from` | number | Slide index where this slide appears (0-based) |
| `fragmentCount` | number | Number of click steps in this slide. Default: 1 |
| `layout` | 'default' \| 'none' | Whether to wrap in AbsoluteFill. Default: 'default' |
| `name` | string | Optional name for navigation |

## Nested Slides

Slides can be nested for complex timing:

```tsx
<Slide from={0}>
  <Background />
  <Slide from={0} layout="none">
    <Title />
  </Slide>
</Slide>
```

## Fragment Count

The `fragmentCount` prop determines how many click steps a slide has.
The fragment counter goes from 0 to `fragmentCount - 1`.

Inside a slide, use `useFragment()` to get the current fragment index.
