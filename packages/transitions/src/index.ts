// Timing utilities
export {
  linearTiming,
  springTiming,
  easedTiming,
  type TransitionPresentation,
  type TransitionTiming,
} from './timing';

// TransitionDeck component
export {
  TransitionDeck,
  type TransitionDeckProps,
  type TransitionDeckSlideProps,
  type TransitionDeckTransitionProps,
} from './TransitionDeck';

// Re-export transition presentations for convenience
export { fade, type FadeOptions } from './fade';
export { slide, type SlideOptions, type SlideDirection } from './slide';
export { wipe, type WipeOptions, type WipeDirection } from './wipe';
export { flip, type FlipOptions, type FlipDirection } from './flip';
