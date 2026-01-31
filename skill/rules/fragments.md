---
name: fragments
description: Fragment animations - revealing content step by step within a slide
metadata:
  tags: fragment, click, reveal, animation, sequence
---

Use `useFragment()` to get the current fragment index within a slide.
Fragments are click-driven - each click advances the fragment counter.

```tsx
import { useFragment, interpolateFragment } from '@presotion/core';

export const RevealList = () => {
  const fragment = useFragment();

  const items = ['First', 'Second', 'Third'];

  return (
    <ul>
      {items.map((item, i) => {
        const opacity = interpolateFragment(fragment, [i, i + 1], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return <li key={i} style={{ opacity }}>{item}</li>;
      })}
    </ul>
  );
};
```

## Fragment Component

Use the `<Fragment>` component for simple reveal animations:

```tsx
import { Fragment } from '@presotion/core';

<Slide from={0} fragmentCount={4}>
  <h1>Title</h1>
  <Fragment at={1}><p>First point</p></Fragment>
  <Fragment at={2}><p>Second point</p></Fragment>
  <Fragment at={3}><p>Third point</p></Fragment>
</Slide>
```

## FragmentList

Use `<FragmentList>` to automatically wrap children in sequential fragments:

```tsx
import { FragmentList } from '@presotion/core';

<FragmentList>
  <p>First point</p>
  <p>Second point</p>
  <p>Third point</p>
</FragmentList>
```

## Animation Types

The Fragment component supports these animation types:

- `fade` (default) - Fade in
- `slide-up` - Slide up and fade in
- `slide-down` - Slide down and fade in
- `slide-left` - Slide from left
- `slide-right` - Slide from right
- `scale` - Scale up and fade in
- `none` - No animation, just show/hide

```tsx
<Fragment at={1} animation="slide-up">
  <p>Slides up when revealed</p>
</Fragment>
```

## FORBIDDEN Patterns

- CSS animations and transitions - they will not sync with clicks
- Tailwind animation classes - they will not export correctly
- setTimeout/setInterval - use fragment-based state only
