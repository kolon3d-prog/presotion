---
name: animations
description: Fundamental animation patterns for Presotion
metadata:
  tags: animations, transitions, fragments, useFragment
---

All animations MUST be driven by the `useFragment()` hook.
Write animations based on fragment indices.

```tsx
import { useFragment, interpolateFragment } from '@presotion/core';

export const FadeIn = () => {
  const fragment = useFragment();

  const opacity = interpolateFragment(fragment, [0, 2], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity }}>Hello World!</div>
  );
};
```

CSS transitions or animations are FORBIDDEN - they will not sync with navigation.
Tailwind animation class names are FORBIDDEN - they will not export correctly.

## Staggered Animations

Stagger animations by offsetting the fragment index:

```tsx
const STAGGER_DELAY = 1;
const fragment = useFragment();

const items = data.map((item, i) => {
  const offset = i * STAGGER_DELAY;
  const progress = spring({
    fragment: fragment - offset,
    config: { damping: 200 },
  });

  return (
    <div
      key={i}
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * 20}px)`,
      }}
    >
      {item}
    </div>
  );
});
```

## Enter and Exit Animations

Use math to combine entrance and exit:

```tsx
const fragment = useFragment();
const fragmentCount = useFragmentCount();

const entrance = spring({ fragment });
const exit = spring({
  fragment,
  delay: fragmentCount - 2,
});

const scale = entrance - exit;
```
