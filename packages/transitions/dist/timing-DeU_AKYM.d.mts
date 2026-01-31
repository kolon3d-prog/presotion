import { CSSProperties } from 'react';

/**
 * Transition presentation interface.
 * Defines how entering and exiting slides should be styled.
 */
interface TransitionPresentation {
    /** Styles for the entering slide */
    enter: (progress: number) => CSSProperties;
    /** Styles for the exiting slide */
    exit: (progress: number) => CSSProperties;
}
/**
 * Timing interface for transitions.
 */
interface TransitionTiming {
    /** Duration of the transition in milliseconds */
    getDurationMs: () => number;
    /** Easing function */
    getProgress: (elapsed: number) => number;
}
/**
 * Create a linear timing for transitions.
 *
 * @example
 * ```tsx
 * <TransitionDeck.Transition
 *   presentation={fade()}
 *   timing={linearTiming({ durationMs: 300 })}
 * />
 * ```
 */
declare function linearTiming(options: {
    durationMs: number;
}): TransitionTiming;
/**
 * Create a spring-based timing for transitions.
 *
 * @example
 * ```tsx
 * <TransitionDeck.Transition
 *   presentation={slide({ direction: 'from-left' })}
 *   timing={springTiming({ config: { damping: 200 } })}
 * />
 * ```
 */
declare function springTiming(options: {
    config?: {
        damping?: number;
        stiffness?: number;
        mass?: number;
    };
    durationMs?: number;
}): TransitionTiming;
/**
 * Create an eased timing for transitions.
 *
 * @example
 * ```tsx
 * <TransitionDeck.Transition
 *   presentation={fade()}
 *   timing={easedTiming({ durationMs: 300, easing: 'ease-in-out' })}
 * />
 * ```
 */
declare function easedTiming(options: {
    durationMs: number;
    easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}): TransitionTiming;

export { type TransitionPresentation as T, type TransitionTiming as a, easedTiming as e, linearTiming as l, springTiming as s };
