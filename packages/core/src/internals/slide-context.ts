import React, { createContext, useContext, ReactNode } from 'react';

/**
 * Slide-level context for tracking fragment state within a slide
 */
export interface SlideContextValue {
  /** The slide index (0-based) */
  slideIndex: number;
  /** Total number of fragments in this slide */
  fragmentCount: number;
  /** Current fragment index within this slide (0-based) */
  currentFragment: number;
  /** Layout mode for the slide */
  layout: 'default' | 'none';
}

export const SlideContext = createContext<SlideContextValue | null>(null);

export function useSlideContext(): SlideContextValue | null {
  return useContext(SlideContext);
}

export function useRequiredSlideContext(): SlideContextValue {
  const context = useSlideContext();
  if (!context) {
    throw new Error(
      'useRequiredSlideContext must be used within a Slide component. ' +
      'Make sure your component is wrapped in a <Slide> or <Deck.Slide> component.'
    );
  }
  return context;
}
