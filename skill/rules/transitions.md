---
name: transitions
description: Slide transitions - fade, slide, wipe, flip
metadata:
  tags: transitions, fade, slide, wipe, animations
---

Use `@presotion/transitions` for animated transitions between slides.

## TransitionDeck

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

  <TransitionDeck.Transition
    presentation={slide({ direction: 'from-left' })}
    timing={linearTiming({ durationMs: 400 })}
  />

  <TransitionDeck.Slide>
    <SlideC />
  </TransitionDeck.Slide>
</TransitionDeck>
```

## Available Transitions

### fade

Simple opacity transition.

```tsx
import { fade } from '@presotion/transitions/fade';

presentation={fade()}
```

### slide

Slide in from a direction.

```tsx
import { slide } from '@presotion/transitions/slide';

presentation={slide({ direction: 'from-left' })}
presentation={slide({ direction: 'from-right' })}
presentation={slide({ direction: 'from-top' })}
presentation={slide({ direction: 'from-bottom' })}
```

### wipe

Wipe reveal effect.

```tsx
import { wipe } from '@presotion/transitions/wipe';

presentation={wipe({ direction: 'left' })}
```

### flip

3D flip transition.

```tsx
import { flip } from '@presotion/transitions/flip';

presentation={flip({ direction: 'horizontal' })}
```

## Timing Options

### linearTiming

Constant speed transition.

```tsx
linearTiming({ durationMs: 300 })
```

### springTiming

Physics-based timing.

```tsx
springTiming({ config: { damping: 200 } })
```

### easedTiming

CSS-like easing.

```tsx
easedTiming({ durationMs: 300, easing: 'ease-in-out' })
```
