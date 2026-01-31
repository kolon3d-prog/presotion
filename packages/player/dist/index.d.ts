import React, { CSSProperties } from 'react';

interface PlayerProps {
    /** The root component of the presentation */
    component: React.ComponentType<any>;
    /** Props to pass to the component */
    inputProps?: Record<string, any>;
    /** Width of the player. Default: 1920 */
    compositionWidth?: number;
    /** Height of the player. Default: 1080 */
    compositionHeight?: number;
    /** Total number of slides */
    slideCount: number;
    /** Fragment counts per slide. Default: all slides have 1 fragment */
    fragmentCounts?: number[];
    /** Player container style */
    style?: CSSProperties;
    /** Player container class name */
    className?: string;
    /** Whether to show controls. Default: true */
    controls?: boolean;
    /** Whether to allow keyboard navigation. Default: true */
    allowKeyboard?: boolean;
    /** Whether to allow click navigation. Default: true */
    allowClick?: boolean;
    /** Whether to loop back to start. Default: false */
    loop?: boolean;
    /** Callback when slide changes */
    onSlideChange?: (slideIndex: number, fragmentIndex: number) => void;
    /** Callback when presentation ends */
    onEnd?: () => void;
    /** Initial slide index. Default: 0 */
    initialSlide?: number;
    /** Initial fragment index. Default: 0 */
    initialFragment?: number;
    /** Autoplay with specified interval in ms. Default: null (no autoplay) */
    autoplay?: number | null;
}
interface PlayerRef {
    /** Go to next fragment/slide */
    next: () => void;
    /** Go to previous fragment/slide */
    prev: () => void;
    /** Go to specific slide */
    goToSlide: (slideIndex: number, fragmentIndex?: number) => void;
    /** Get current state */
    getState: () => {
        slide: number;
        fragment: number;
    };
    /** Pause autoplay */
    pause: () => void;
    /** Resume autoplay */
    play: () => void;
    /** Toggle fullscreen */
    toggleFullscreen: () => void;
}
/**
 * Player component for embedding Presotion presentations.
 *
 * @example
 * ```tsx
 * import { Player } from '@presotion/player';
 * import { MyPresentation } from './MyPresentation';
 *
 * function App() {
 *   return (
 *     <Player
 *       component={MyPresentation}
 *       compositionWidth={1920}
 *       compositionHeight={1080}
 *       slideCount={10}
 *       inputProps={{ title: 'My Talk' }}
 *     />
 *   );
 * }
 * ```
 */
declare const Player: React.ForwardRefExoticComponent<PlayerProps & React.RefAttributes<PlayerRef>>;

export { Player, type PlayerProps, type PlayerRef };
