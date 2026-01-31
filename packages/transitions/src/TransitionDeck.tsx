import React, { ReactNode, Children, isValidElement, useMemo, useState, useEffect, useRef } from 'react';
import { usePresentationContext, AbsoluteFill } from '@presotion/core';
import { TransitionPresentation, TransitionTiming, linearTiming } from './timing';

export interface TransitionDeckSlideProps {
  /** Total number of fragments in this slide. Default: 1 */
  fragmentCount?: number;
  /** Children to render */
  children?: ReactNode;
  /** Slide name */
  name?: string;
}

function TransitionDeckSlide({ children }: TransitionDeckSlideProps): React.ReactElement {
  return <>{children}</>;
}

TransitionDeckSlide.displayName = 'TransitionDeck.Slide';

export interface TransitionDeckTransitionProps {
  /** Transition presentation (fade, slide, etc.) */
  presentation: TransitionPresentation;
  /** Timing for the transition */
  timing?: TransitionTiming;
}

function TransitionDeckTransition(_props: TransitionDeckTransitionProps): React.ReactElement | null {
  return null;
}

TransitionDeckTransition.displayName = 'TransitionDeck.Transition';

export interface TransitionDeckProps {
  /** Children (TransitionDeck.Slide and TransitionDeck.Transition) */
  children?: ReactNode;
}

interface TransitionDeckComponent extends React.FC<TransitionDeckProps> {
  Slide: typeof TransitionDeckSlide;
  Transition: typeof TransitionDeckTransition;
}

/**
 * A deck with transitions between slides.
 * 
 * @example
 * ```tsx
 * import { TransitionDeck, linearTiming } from '@presotion/transitions';
 * import { fade } from '@presotion/transitions/fade';
 * import { slide } from '@presotion/transitions/slide';
 * 
 * <TransitionDeck>
 *   <TransitionDeck.Slide>
 *     <SlideA />
 *   </TransitionDeck.Slide>
 *   
 *   <TransitionDeck.Transition
 *     presentation={fade()}
 *     timing={linearTiming({ durationMs: 300 })}
 *   />
 *   
 *   <TransitionDeck.Slide>
 *     <SlideB />
 *   </TransitionDeck.Slide>
 * </TransitionDeck>
 * ```
 */
const TransitionDeckBase: React.FC<TransitionDeckProps> = ({ children }) => {
  const { state } = usePresentationContext();
  const { currentSlide } = state;
  const prevSlideRef = useRef(currentSlide);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  
  // Parse children to extract slides and transitions
  const { slides, transitions } = useMemo(() => {
    const slidesList: Array<{ element: React.ReactElement; index: number }> = [];
    const transitionsList: Array<{ 
      presentation: TransitionPresentation; 
      timing: TransitionTiming;
      afterSlideIndex: number;
    }> = [];
    
    let slideIndex = 0;
    
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      
      if (child.type === TransitionDeckSlide) {
        slidesList.push({ element: child, index: slideIndex });
        slideIndex++;
      } else if (child.type === TransitionDeckTransition) {
        const props = child.props as TransitionDeckTransitionProps;
        transitionsList.push({
          presentation: props.presentation,
          timing: props.timing ?? linearTiming({ durationMs: 300 }),
          afterSlideIndex: slideIndex - 1,
        });
      }
    });
    
    return { slides: slidesList, transitions: transitionsList };
  }, [children]);
  
  // Handle slide transitions
  useEffect(() => {
    if (currentSlide === prevSlideRef.current) return;
    
    const prevSlide = prevSlideRef.current;
    const transitionDef = transitions.find(
      (t) => t.afterSlideIndex === Math.min(prevSlide, currentSlide)
    );
    
    if (transitionDef) {
      setIsTransitioning(true);
      setTransitionProgress(0);
      
      const duration = transitionDef.timing.getDurationMs();
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = transitionDef.timing.getProgress(elapsed);
        
        setTransitionProgress(progress);
        
        if (elapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          setIsTransitioning(false);
          setTransitionProgress(1);
        }
      };
      
      requestAnimationFrame(animate);
    }
    
    prevSlideRef.current = currentSlide;
  }, [currentSlide, transitions]);
  
  // Get current and previous slide
  const currentSlideData = slides.find((s) => s.index === currentSlide);
  const prevSlideData = slides.find((s) => s.index === prevSlideRef.current);
  
  // Get transition for current slide change
  const activeTransition = transitions.find(
    (t) => t.afterSlideIndex === Math.min(prevSlideRef.current, currentSlide)
  );
  
  if (!currentSlideData) {
    return null;
  }
  
  const isGoingForward = currentSlide > prevSlideRef.current;
  
  return (
    <AbsoluteFill>
      {/* Previous slide (exiting) */}
      {isTransitioning && prevSlideData && activeTransition && (
        <AbsoluteFill
          style={{
            ...activeTransition.presentation.exit(transitionProgress),
            zIndex: isGoingForward ? 1 : 2,
          }}
        >
          {prevSlideData.element.props.children}
        </AbsoluteFill>
      )}
      
      {/* Current slide (entering) */}
      <AbsoluteFill
        style={{
          ...(isTransitioning && activeTransition
            ? activeTransition.presentation.enter(transitionProgress)
            : {}),
          zIndex: isGoingForward ? 2 : 1,
        }}
      >
        {currentSlideData.element.props.children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const TransitionDeck = TransitionDeckBase as TransitionDeckComponent;
TransitionDeck.Slide = TransitionDeckSlide;
TransitionDeck.Transition = TransitionDeckTransition;
