import { TransitionPresentation } from './timing';

export type WipeDirection = 'left' | 'right' | 'up' | 'down';

export interface WipeOptions {
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
export function wipe(options: WipeOptions = {}): TransitionPresentation {
  const { direction = 'left' } = options;
  
  const getClipPath = (progress: number, isEnter: boolean) => {
    const p = isEnter ? progress : 1 - progress;
    
    switch (direction) {
      case 'left':
        return `inset(0 ${(1 - p) * 100}% 0 0)`;
      case 'right':
        return `inset(0 0 0 ${(1 - p) * 100}%)`;
      case 'up':
        return `inset(0 0 ${(1 - p) * 100}% 0)`;
      case 'down':
        return `inset(${(1 - p) * 100}% 0 0 0)`;
      default:
        return `inset(0 ${(1 - p) * 100}% 0 0)`;
    }
  };
  
  return {
    enter: (progress: number) => ({
      clipPath: getClipPath(progress, true),
    }),
    exit: (progress: number) => ({
      clipPath: getClipPath(progress, false),
    }),
  };
}
