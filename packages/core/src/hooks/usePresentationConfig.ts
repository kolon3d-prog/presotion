import { usePresentationContext, PresentationConfig } from '../internals/context';

/**
 * Returns the presentation configuration.
 * 
 * @example
 * ```tsx
 * const MySlide = () => {
 *   const { width, height, slideCount } = usePresentationConfig();
 *   return (
 *     <div>
 *       Resolution: {width}x{height}, Total slides: {slideCount}
 *     </div>
 *   );
 * };
 * ```
 */
export function usePresentationConfig(): PresentationConfig {
  const { config } = usePresentationContext();
  return config;
}
