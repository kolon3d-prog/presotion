import { TransitionPresentation } from './timing';

export interface FadeOptions {
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
export function fade(options: FadeOptions = {}): TransitionPresentation {
  const { enterFrom = 0, exitTo = 0 } = options;
  
  return {
    enter: (progress: number) => ({
      opacity: enterFrom + (1 - enterFrom) * progress,
    }),
    exit: (progress: number) => ({
      opacity: 1 - (1 - exitTo) * progress,
    }),
  };
}
