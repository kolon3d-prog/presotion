import { useSlideContext } from '../internals/slide-context';
import { usePresentationContext } from '../internals/context';

/**
 * Returns the current fragment index within the current slide (0-based).
 * 
 * Fragments are click-driven steps within a slide. Each click advances
 * the fragment counter until all fragments are revealed.
 * 
 * @example
 * ```tsx
 * const BulletList = () => {
 *   const fragment = useFragment();
 *   
 *   return (
 *     <ul>
 *       <li style={{ opacity: fragment >= 0 ? 1 : 0 }}>First item</li>
 *       <li style={{ opacity: fragment >= 1 ? 1 : 0 }}>Second item</li>
 *       <li style={{ opacity: fragment >= 2 ? 1 : 0 }}>Third item</li>
 *     </ul>
 *   );
 * };
 * ```
 */
export function useFragment(): number {
  const slideContext = useSlideContext();
  const { state } = usePresentationContext();
  
  // If we're inside a Slide, use the slide's fragment state
  if (slideContext) {
    return slideContext.currentFragment;
  }
  
  // Otherwise, use the global fragment state
  return state.currentFragment;
}

/**
 * Returns the total number of fragments in the current slide.
 */
export function useFragmentCount(): number {
  const slideContext = useSlideContext();
  
  if (slideContext) {
    return slideContext.fragmentCount;
  }
  
  return 1; // Default to 1 if not in a slide
}
