import React, { ReactNode, Children, isValidElement, useMemo } from 'react';
import { SlideContext, SlideContextValue } from '../internals/slide-context';
import { usePresentationContext } from '../internals/context';
import { AbsoluteFill } from './AbsoluteFill';

export interface DeckSlideProps {
  /** Total number of fragments (click steps) in this slide. Default: 1 */
  fragmentCount?: number;
  /** Children to render inside the slide */
  children?: ReactNode;
  /** Name/ID for the slide (useful for navigation) */
  name?: string;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * A slide within a Deck. Position is automatically calculated.
 */
function DeckSlide({
  fragmentCount = 1,
  children,
  name,
  className,
  style,
}: DeckSlideProps): React.ReactElement {
  // This component is only used for type checking and extracting props
  // The actual rendering is handled by the parent Deck component
  return <>{children}</>;
}

DeckSlide.displayName = 'Deck.Slide';

export interface DeckProps {
  /** Deck.Slide children */
  children?: ReactNode;
  /** Starting slide index. Default: 0 */
  startFrom?: number;
}

interface DeckComponent extends React.FC<DeckProps> {
  Slide: typeof DeckSlide;
}

/**
 * A Deck component that automatically sequences slides.
 * 
 * Unlike using individual Slide components with explicit `from` props,
 * Deck automatically calculates the slide positions based on order.
 * 
 * @example
 * ```tsx
 * <Deck>
 *   <Deck.Slide fragmentCount={3}>
 *     <IntroSlide />
 *   </Deck.Slide>
 *   <Deck.Slide fragmentCount={5}>
 *     <MainContent />
 *   </Deck.Slide>
 *   <Deck.Slide fragmentCount={2}>
 *     <Conclusion />
 *   </Deck.Slide>
 * </Deck>
 * ```
 */
const DeckBase: React.FC<DeckProps> = ({ children, startFrom = 0 }) => {
  const { state } = usePresentationContext();
  const { currentSlide, currentFragment } = state;

  // Extract slide information from children
  const slides = useMemo(() => {
    const result: Array<{
      element: React.ReactElement<DeckSlideProps>;
      slideIndex: number;
      fragmentCount: number;
    }> = [];

    let slideIndex = startFrom;

    Children.forEach(children, (child) => {
      if (isValidElement<DeckSlideProps>(child) && child.type === DeckSlide) {
        result.push({
          element: child,
          slideIndex,
          fragmentCount: child.props.fragmentCount ?? 1,
        });
        slideIndex++;
      }
    });

    return result;
  }, [children, startFrom]);

  // Find the current slide to render
  const currentSlideData = slides.find((s) => s.slideIndex === currentSlide);

  if (!currentSlideData) {
    return null;
  }

  const { element, slideIndex, fragmentCount } = currentSlideData;
  const props = element.props as DeckSlideProps;

  const contextValue: SlideContextValue = useMemo(
    () => ({
      slideIndex,
      fragmentCount,
      currentFragment,
      layout: 'default',
    }),
    [slideIndex, fragmentCount, currentFragment]
  );

  return (
    <AbsoluteFill 
      className={props.className} 
      style={props.style}
      data-slide={slideIndex}
      data-slide-name={props.name}
    >
      <SlideContext.Provider value={contextValue}>
        {props.children}
      </SlideContext.Provider>
    </AbsoluteFill>
  );
};

export const Deck = DeckBase as DeckComponent;
Deck.Slide = DeckSlide;
