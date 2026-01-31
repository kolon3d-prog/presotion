import { T as TransitionPresentation, a as TransitionTiming } from './timing-DeU_AKYM.js';
export { e as easedTiming, l as linearTiming, s as springTiming } from './timing-DeU_AKYM.js';
import React, { ReactNode } from 'react';
export { FadeOptions, fade } from './fade.js';
export { SlideDirection, SlideOptions, slide } from './slide.js';
export { WipeDirection, WipeOptions, wipe } from './wipe.js';
export { FlipDirection, FlipOptions, flip } from './flip.js';

interface TransitionDeckSlideProps {
    /** Total number of fragments in this slide. Default: 1 */
    fragmentCount?: number;
    /** Children to render */
    children?: ReactNode;
    /** Slide name */
    name?: string;
}
declare function TransitionDeckSlide({ children }: TransitionDeckSlideProps): React.ReactElement;
declare namespace TransitionDeckSlide {
    var displayName: string;
}
interface TransitionDeckTransitionProps {
    /** Transition presentation (fade, slide, etc.) */
    presentation: TransitionPresentation;
    /** Timing for the transition */
    timing?: TransitionTiming;
}
declare function TransitionDeckTransition(_props: TransitionDeckTransitionProps): React.ReactElement | null;
declare namespace TransitionDeckTransition {
    var displayName: string;
}
interface TransitionDeckProps {
    /** Children (TransitionDeck.Slide and TransitionDeck.Transition) */
    children?: ReactNode;
}
interface TransitionDeckComponent extends React.FC<TransitionDeckProps> {
    Slide: typeof TransitionDeckSlide;
    Transition: typeof TransitionDeckTransition;
}
declare const TransitionDeck: TransitionDeckComponent;

export { TransitionDeck, type TransitionDeckProps, type TransitionDeckSlideProps, type TransitionDeckTransitionProps, TransitionPresentation, TransitionTiming };
