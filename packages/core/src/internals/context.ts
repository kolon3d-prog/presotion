import React, { createContext, useContext, ReactNode } from 'react';

/**
 * Configuration for a presentation
 */
export interface PresentationConfig {
  /** Unique identifier for the presentation */
  id: string;
  /** Width of the presentation in pixels */
  width: number;
  /** Height of the presentation in pixels */
  height: number;
  /** Total number of slides in the presentation */
  slideCount: number;
}

/**
 * State of the presentation playback
 */
export interface PresentationState {
  /** Current slide index (0-based) */
  currentSlide: number;
  /** Current fragment index within the slide (0-based) */
  currentFragment: number;
  /** Whether the presentation is in presenter mode */
  isPresenterMode: boolean;
}

/**
 * Navigation controls for the presentation
 */
export interface PresentationNavigation {
  /** Go to the next fragment or slide */
  next: () => void;
  /** Go to the previous fragment or slide */
  prev: () => void;
  /** Go to a specific slide */
  goToSlide: (slideIndex: number, fragmentIndex?: number) => void;
  /** Toggle presenter mode */
  togglePresenterMode: () => void;
}

export interface PresentationContextValue {
  config: PresentationConfig;
  state: PresentationState;
  navigation: PresentationNavigation;
}

export const PresentationContext = createContext<PresentationContextValue | null>(null);

export function usePresentationContext(): PresentationContextValue {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error(
      'usePresentationContext must be used within a PresentationProvider. ' +
      'Make sure your component is wrapped in a <Presentation> or <Player> component.'
    );
  }
  return context;
}
