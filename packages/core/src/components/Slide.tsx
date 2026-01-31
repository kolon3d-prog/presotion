import React, { ReactNode, useMemo } from 'react';
import { SlideContext, SlideContextValue } from '../internals/slide-context';
import { usePresentationContext } from '../internals/context';
import { AbsoluteFill } from './AbsoluteFill';

export interface SlideProps {
  /** The slide index where this slide starts (0-based) */
  from: number;
  /** Total number of fragments (click steps) in this slide. Default: 1 */
  fragmentCount?: number;
  /** Children to render inside the slide */
  children?: ReactNode;
  /** 
   * Layout mode.
   * - 'default': Wraps content in AbsoluteFill
   * - 'none': No wrapper, content is rendered directly
   */
  layout?: 'default' | 'none';
  /** Name/ID for the slide (useful for navigation) */
  name?: string;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * A Slide component that represents a single slide in the presentation.
 * 
 * Slides are positioned using the `from` prop, which specifies at which
 * slide index this content should be visible.
 * 
 * Inside a Slide, `useFragment()` returns the fragment index local to
 * this slide (starting from 0).
 * 
 * @example
 * ```tsx
 * // Basic slide
 * <Slide from={0} fragmentCount={3}>
 *   <TitleSlide />
 * </Slide>
 * 
 * // Slide without wrapper
 * <Slide from={1} layout="none">
 *   <CustomLayout />
 * </Slide>
 * ```
 */
export function Slide({
  from,
  fragmentCount = 1,
  children,
  layout = 'default',
  name,
  className,
  style,
}: SlideProps): React.ReactElement | null {
  const { state } = usePresentationContext();
  const { currentSlide, currentFragment } = state;

  // Only render if we're on this slide
  const isVisible = currentSlide === from;

  // Calculate the local fragment index for this slide
  const localFragment = isVisible ? currentFragment : 0;

  const contextValue: SlideContextValue = useMemo(
    () => ({
      slideIndex: from,
      fragmentCount,
      currentFragment: localFragment,
      layout,
    }),
    [from, fragmentCount, localFragment, layout]
  );

  if (!isVisible) {
    return null;
  }

  const content = (
    <SlideContext.Provider value={contextValue}>
      {children}
    </SlideContext.Provider>
  );

  if (layout === 'none') {
    return <>{content}</>;
  }

  return (
    <AbsoluteFill className={className} style={style} data-slide={from} data-slide-name={name}>
      {content}
    </AbsoluteFill>
  );
}
