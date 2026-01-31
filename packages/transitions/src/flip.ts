import { TransitionPresentation } from './timing';

export type FlipDirection = 'horizontal' | 'vertical';

export interface FlipOptions {
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
export function flip(options: FlipOptions = {}): TransitionPresentation {
  const { direction = 'horizontal', perspective = 1000 } = options;
  
  const axis = direction === 'horizontal' ? 'Y' : 'X';
  
  return {
    enter: (progress: number) => ({
      transform: `perspective(${perspective}px) rotate${axis}(${(1 - progress) * -90}deg)`,
      backfaceVisibility: 'hidden' as const,
    }),
    exit: (progress: number) => ({
      transform: `perspective(${perspective}px) rotate${axis}(${progress * 90}deg)`,
      backfaceVisibility: 'hidden' as const,
    }),
  };
}
