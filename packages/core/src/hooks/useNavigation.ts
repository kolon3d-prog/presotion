import { usePresentationContext, PresentationNavigation } from '../internals/context';

/**
 * Returns navigation controls for the presentation.
 * 
 * @example
 * ```tsx
 * const NavigationButtons = () => {
 *   const { next, prev, goToSlide } = useNavigation();
 *   
 *   return (
 *     <div>
 *       <button onClick={prev}>Previous</button>
 *       <button onClick={next}>Next</button>
 *       <button onClick={() => goToSlide(0)}>Go to start</button>
 *     </div>
 *   );
 * };
 * ```
 */
export function useNavigation(): PresentationNavigation {
  const { navigation } = usePresentationContext();
  return navigation;
}
