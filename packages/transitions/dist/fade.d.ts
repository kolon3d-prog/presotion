import { T as TransitionPresentation } from './timing-DeU_AKYM.js';
import 'react';

interface FadeOptions {
    /** Starting opacity for enter. Default: 0 */
    enterFrom?: number;
    /** Ending opacity for exit. Default: 0 */
    exitTo?: number;
}
/**
 * Create a fade transition.
 *
 * @example
 * ```tsx
 * import { fade } from '@presotion/transitions/fade';
 *
 * <TransitionDeck.Transition
 *   presentation={fade()}
 *   timing={linearTiming({ durationMs: 300 })}
 * />
 * ```
 */
declare function fade(options?: FadeOptions): TransitionPresentation;

export { type FadeOptions, fade };
