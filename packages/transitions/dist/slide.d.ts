import { T as TransitionPresentation } from './timing-DeU_AKYM.js';
import 'react';

type SlideDirection = 'from-left' | 'from-right' | 'from-top' | 'from-bottom';
interface SlideOptions {
    /** Direction of the slide. Default: 'from-right' */
    direction?: SlideDirection;
}
/**
 * Create a slide transition.
 *
 * @example
 * ```tsx
 * import { slide } from '@presotion/transitions/slide';
 *
 * <TransitionDeck.Transition
 *   presentation={slide({ direction: 'from-left' })}
 *   timing={linearTiming({ durationMs: 300 })}
 * />
 * ```
 */
declare function slide(options?: SlideOptions): TransitionPresentation;

export { type SlideDirection, type SlideOptions, slide };
