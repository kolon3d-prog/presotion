// Components
export {
  AbsoluteFill,
  Slide,
  Deck,
  Fragment,
  FragmentList,
  Presentation,
  Img,
  type AbsoluteFillProps,
  type SlideProps,
  type DeckProps,
  type DeckSlideProps,
  type FragmentProps,
  type FragmentListProps,
  type PresentationProps,
  type ImgProps,
} from './components';

// Hooks
export {
  useCurrentSlide,
  useFragment,
  useFragmentCount,
  usePresentationConfig,
  useNavigation,
  useProgress,
} from './hooks';

// Animation utilities
export {
  interpolateFragment,
  interpolate,
  type InterpolateOptions,
} from './interpolate';

export {
  spring,
  SpringConfigs,
  getSpringDuration,
  type SpringConfig,
  type SpringOptions,
} from './spring';

export { Easing } from './easing';

// Asset utilities
export { staticFile } from './staticFile';

// Context (for advanced usage like Player)
export { PresentationContext, usePresentationContext } from './internals/context';

// Context types (for advanced usage)
export type {
  PresentationConfig,
  PresentationState,
  PresentationNavigation,
  PresentationContextValue,
} from './internals/context';

export type { SlideContextValue } from './internals/slide-context';
