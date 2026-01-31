import { usePresentationContext } from '../internals/context';

/**
 * Returns the overall progress through the presentation (0 to 1).
 * 
 * This is useful for progress bars or animations that span the entire presentation.
 * 
 * @example
 * ```tsx
 * const ProgressBar = () => {
 *   const progress = useProgress();
 *   return (
 *     <div style={{ width: '100%', height: 4, background: '#eee' }}>
 *       <div style={{ width: `${progress * 100}%`, height: '100%', background: 'blue' }} />
 *     </div>
 *   );
 * };
 * ```
 */
export function useProgress(): number {
  const { config, state } = usePresentationContext();
  
  if (config.slideCount <= 1) {
    return state.currentSlide === 0 ? 0 : 1;
  }
  
  return state.currentSlide / (config.slideCount - 1);
}
