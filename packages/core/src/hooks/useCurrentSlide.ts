import { usePresentationContext } from '../internals/context';

/**
 * Returns the current slide index (0-based).
 * 
 * Inside a Slide component, this returns the global slide index.
 * 
 * @example
 * ```tsx
 * const MySlide = () => {
 *   const slide = useCurrentSlide();
 *   return <div>This is slide {slide + 1}</div>;
 * };
 * ```
 */
export function useCurrentSlide(): number {
  const { state } = usePresentationContext();
  return state.currentSlide;
}
