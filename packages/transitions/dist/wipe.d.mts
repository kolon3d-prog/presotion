import { T as TransitionPresentation } from './timing-DeU_AKYM.mjs';
import 'react';

type WipeDirection = 'left' | 'right' | 'up' | 'down';
interface WipeOptions {
    /** Direction of the wipe. Default: 'left' */
    direction?: WipeDirection;
}
/**
 * Create a wipe transition using clip-path.
 *
 * @example
 * ```tsx
 * import { wipe } from '@presotion/transitions/wipe';
 *
 * <TransitionDeck.Transition
 *   presentation={wipe({ direction: 'left' })}
 *   timing={linearTiming({ durationMs: 500 })}
 * />
 * ```
 */
declare function wipe(options?: WipeOptions): TransitionPresentation;

export { type WipeDirection, type WipeOptions, wipe };
