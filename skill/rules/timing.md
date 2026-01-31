---
name: timing
description: Interpolation curves in Presotion - linear, easing, spring animations
metadata:
  tags: spring, easing, interpolation
---

## Linear Interpolation

A simple linear interpolation is done using the `interpolateFragment` function.

```ts
import { interpolateFragment } from '@presotion/core';

const opacity = interpolateFragment(fragment, [0, 3], [0, 1]);
```

By default, the values are not clamped. Here is how they can be clamped:

```ts
const opacity = interpolateFragment(fragment, [0, 3], [0, 1], {
  extrapolateRight: 'clamp',
  extrapolateLeft: 'clamp',
});
```

## Spring Animations

Spring animations have more natural motion.
They go from 0 to 1 based on fragment index.

```ts
import { spring, useFragment } from '@presotion/core';

const fragment = useFragment();

const scale = spring({
  fragment,
});
```

### Physical Properties

The default configuration is: `mass: 1, damping: 10, stiffness: 100`.
This leads to a bit of bounce before settling.

The config can be overwritten:

```ts
const scale = spring({
  fragment,
  config: { damping: 200 },
});
```

### Common Configurations

```tsx
import { SpringConfigs } from '@presotion/core';

// Use predefined configs
const scale = spring({ fragment, config: SpringConfigs.smooth });  // No bounce
const scale = spring({ fragment, config: SpringConfigs.snappy });  // Minimal bounce
const scale = spring({ fragment, config: SpringConfigs.bouncy });  // Playful
const scale = spring({ fragment, config: SpringConfigs.heavy });   // Slow, heavy
```

### Delay

Use the `delay` parameter to delay the animation:

```tsx
const entrance = spring({
  fragment,
  delay: 2, // Start at fragment 2
});
```

### Combining spring() with interpolateFragment()

Map spring output (0-1) to custom ranges:

```tsx
const springProgress = spring({ fragment });

const rotation = interpolateFragment(springProgress, [0, 1], [0, 360]);

<div style={{ rotate: rotation + 'deg' }} />;
```

## Easing

Easing can be added to the `interpolateFragment` function:

```ts
import { interpolateFragment, Easing } from '@presotion/core';

const value = interpolateFragment(fragment, [0, 5], [0, 1], {
  easing: Easing.inOut(Easing.quad),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

Available curves:
- `Easing.quad`
- `Easing.cubic`
- `Easing.sin`
- `Easing.exp`
- `Easing.circle`
- `Easing.elastic`
- `Easing.bounce`

Modifiers:
- `Easing.in(curve)` - Start slow
- `Easing.out(curve)` - End slow
- `Easing.inOut(curve)` - Slow start and end
