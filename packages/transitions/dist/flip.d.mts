import { T as TransitionPresentation } from './timing-DeU_AKYM.mjs';
import 'react';

type FlipDirection = 'horizontal' | 'vertical';
interface FlipOptions {
    /** Direction of the flip. Default: 'horizontal' */
    direction?: FlipDirection;
    /** Perspective in pixels. Default: 1000 */
    perspective?: number;
}
/**
 * Create a flip transition.
 *
 * @example
 * ```tsx
 * import { flip } from '@presotion/transitions/flip';
 *
 * <TransitionDeck.Transition
 *   presentation={flip({ direction: 'horizontal' })}
 *   timing={linearTiming({ durationMs: 600 })}
 * />
 * ```
 */
declare function flip(options?: FlipOptions): TransitionPresentation;

export { type FlipDirection, type FlipOptions, flip };
