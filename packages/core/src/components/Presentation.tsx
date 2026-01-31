import React, { ReactNode, useState, useCallback, useMemo, useEffect } from 'react';
import { 
  PresentationContext, 
  PresentationConfig, 
  PresentationState,
  PresentationNavigation,
  PresentationContextValue 
} from '../internals/context';

export interface PresentationProps {
  /** Unique identifier for the presentation */
  id: string;
  /** The root component to render */
  component: React.ComponentType<any>;
  /** Width of the presentation in pixels. Default: 1920 */
  width?: number;
  /** Height of the presentation in pixels. Default: 1080 */
  height?: number;
  /** Total number of slides */
  slideCount: number;
  /** Default props to pass to the component */
  defaultProps?: Record<string, any>;
  /** 
   * Schema for validating props (Zod schema).
   * Enables visual editing in the Studio.
   */
  schema?: any;
  /**
   * Function to dynamically calculate metadata before rendering.
   * Can return modified slideCount, dimensions, or props.
   */
  calculateMetadata?: (params: {
    props: Record<string, any>;
    abortSignal: AbortSignal;
  }) => Promise<{
    slideCount?: number;
    width?: number;
    height?: number;
    props?: Record<string, any>;
  }>;
}

/**
 * The root Presentation component that defines a presentation.
 * 
 * Similar to Remotion's Composition, this is the entry point
 * for a presentation, defining its metadata and root component.
 * 
 * @example
 * ```tsx
 * // src/Root.tsx
 * import { Presentation } from '@presotion/core';
 * import { MyTalk } from './MyTalk';
 * 
 * export const PresotionRoot = () => {
 *   return (
 *     <Presentation
 *       id="my-talk"
 *       component={MyTalk}
 *       slideCount={10}
 *       defaultProps={{
 *         title: 'My Amazing Talk',
 *         author: 'John Doe',
 *       }}
 *     />
 *   );
 * };
 * ```
 */
export function Presentation({
  id,
  component: Component,
  width = 1920,
  height = 1080,
  slideCount,
  defaultProps = {},
  schema,
  calculateMetadata,
}: PresentationProps): React.ReactElement {
  // Fragment counts per slide (for navigation)
  const [fragmentCounts, setFragmentCounts] = useState<number[]>([]);
  
  const [state, setState] = useState<PresentationState>({
    currentSlide: 0,
    currentFragment: 0,
    isPresenterMode: false,
  });

  const [resolvedProps, setResolvedProps] = useState(defaultProps);
  const [resolvedMetadata, setResolvedMetadata] = useState({
    slideCount,
    width,
    height,
  });

  // Run calculateMetadata if provided
  useEffect(() => {
    if (!calculateMetadata) return;

    const controller = new AbortController();
    
    calculateMetadata({
      props: defaultProps,
      abortSignal: controller.signal,
    })
      .then((result) => {
        if (controller.signal.aborted) return;
        
        setResolvedMetadata((prev) => ({
          slideCount: result.slideCount ?? prev.slideCount,
          width: result.width ?? prev.width,
          height: result.height ?? prev.height,
        }));
        
        if (result.props) {
          setResolvedProps(result.props);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('calculateMetadata failed:', err);
        }
      });

    return () => controller.abort();
  }, [calculateMetadata, defaultProps]);

  const config: PresentationConfig = useMemo(
    () => ({
      id,
      width: resolvedMetadata.width,
      height: resolvedMetadata.height,
      slideCount: resolvedMetadata.slideCount,
    }),
    [id, resolvedMetadata]
  );

  const navigation: PresentationNavigation = useMemo(
    () => ({
      next: () => {
        setState((prev) => {
          const currentFragmentCount = fragmentCounts[prev.currentSlide] ?? 1;
          
          // If there are more fragments, advance fragment
          if (prev.currentFragment < currentFragmentCount - 1) {
            return { ...prev, currentFragment: prev.currentFragment + 1 };
          }
          
          // Otherwise, go to next slide
          if (prev.currentSlide < resolvedMetadata.slideCount - 1) {
            return { ...prev, currentSlide: prev.currentSlide + 1, currentFragment: 0 };
          }
          
          return prev;
        });
      },
      
      prev: () => {
        setState((prev) => {
          // If there are previous fragments, go back
          if (prev.currentFragment > 0) {
            return { ...prev, currentFragment: prev.currentFragment - 1 };
          }
          
          // Otherwise, go to previous slide's last fragment
          if (prev.currentSlide > 0) {
            const prevSlideFragmentCount = fragmentCounts[prev.currentSlide - 1] ?? 1;
            return {
              ...prev,
              currentSlide: prev.currentSlide - 1,
              currentFragment: prevSlideFragmentCount - 1,
            };
          }
          
          return prev;
        });
      },
      
      goToSlide: (slideIndex: number, fragmentIndex: number = 0) => {
        if (slideIndex >= 0 && slideIndex < resolvedMetadata.slideCount) {
          setState((prev) => ({
            ...prev,
            currentSlide: slideIndex,
            currentFragment: fragmentIndex,
          }));
        }
      },
      
      togglePresenterMode: () => {
        setState((prev) => ({
          ...prev,
          isPresenterMode: !prev.isPresenterMode,
        }));
      },
    }),
    [fragmentCounts, resolvedMetadata.slideCount]
  );

  const contextValue: PresentationContextValue = useMemo(
    () => ({ config, state, navigation }),
    [config, state, navigation]
  );

  // Register fragment counts from child slides
  const registerFragmentCount = useCallback((slideIndex: number, count: number) => {
    setFragmentCounts((prev) => {
      const next = [...prev];
      next[slideIndex] = count;
      return next;
    });
  }, []);

  return (
    <PresentationContext.Provider value={contextValue}>
      <div
        data-presotion-presentation={id}
        style={{
          width: config.width,
          height: config.height,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        <Component {...resolvedProps} />
      </div>
    </PresentationContext.Provider>
  );
}
