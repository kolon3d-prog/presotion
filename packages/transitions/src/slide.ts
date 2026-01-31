import { TransitionPresentation } from './timing';

export type SlideDirection = 'from-left' | 'from-right' | 'from-top' | 'from-bottom';

export interface SlideOptions {
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
export function slide(options: SlideOptions = {}): TransitionPresentation {
  const { direction = 'from-right' } = options;
  
  const getTransform = (progress: number, isEnter: boolean) => {
    const offset = isEnter ? 1 - progress : progress;
    
    switch (direction) {
      case 'from-left':
        return `translateX(${isEnter ? -offset * 100 : offset * 100}%)`;
      case 'from-right':
        return `translateX(${isEnter ? offset * 100 : -offset * 100}%)`;
      case 'from-top':
        return `translateY(${isEnter ? -offset * 100 : offset * 100}%)`;
      case 'from-bottom':
        return `translateY(${isEnter ? offset * 100 : -offset * 100}%)`;
      default:
        return `translateX(${isEnter ? offset * 100 : -offset * 100}%)`;
    }
  };
  
  return {
    enter: (progress: number) => ({
      transform: getTransform(progress, true),
    }),
    exit: (progress: number) => ({
      transform: getTransform(progress, false),
    }),
  };
}
