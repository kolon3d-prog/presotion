import React, { ReactNode, CSSProperties, ImgHTMLAttributes } from 'react';

interface AbsoluteFillProps {
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
}
/**
 * A container component that fills its parent absolutely.
 *
 * This is the recommended wrapper for slide content to ensure
 * proper stacking and positioning within the presentation canvas.
 *
 * @example
 * ```tsx
 * <AbsoluteFill style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
 *   <h1>Centered Title</h1>
 * </AbsoluteFill>
 * ```
 */
declare const AbsoluteFill: React.ForwardRefExoticComponent<AbsoluteFillProps & React.RefAttributes<HTMLDivElement>>;

interface SlideProps {
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
declare function Slide({ from, fragmentCount, children, layout, name, className, style, }: SlideProps): React.ReactElement | null;

interface DeckSlideProps {
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
declare function DeckSlide({ fragmentCount, children, name, className, style, }: DeckSlideProps): React.ReactElement;
declare namespace DeckSlide {
    var displayName: string;
}
interface DeckProps {
    /** Deck.Slide children */
    children?: ReactNode;
    /** Starting slide index. Default: 0 */
    startFrom?: number;
}
interface DeckComponent extends React.FC<DeckProps> {
    Slide: typeof DeckSlide;
}
declare const Deck: DeckComponent;

interface SpringConfig {
    /** Mass of the object. Default: 1 */
    mass?: number;
    /** Damping coefficient. Higher = less bouncy. Default: 10 */
    damping?: number;
    /** Stiffness of the spring. Higher = faster. Default: 100 */
    stiffness?: number;
}
interface SpringOptions {
    /** The current fragment index */
    fragment: number;
    /** Delay in fragments before the animation starts */
    delay?: number;
    /** Duration in fragments (overrides physics-based duration) */
    durationInFragments?: number;
    /** Spring physics configuration */
    config?: SpringConfig;
    /** Starting value. Default: 0 */
    from?: number;
    /** Ending value. Default: 1 */
    to?: number;
}
/** Common spring configurations */
declare const SpringConfigs: {
    /** Smooth motion without bounce - good for subtle reveals */
    smooth: SpringConfig;
    /** Snappy motion with minimal bounce - good for UI elements */
    snappy: SpringConfig;
    /** Bouncy entrance - good for playful animations */
    bouncy: SpringConfig;
    /** Heavy, slow motion with small bounce */
    heavy: SpringConfig;
    /** Default spring configuration */
    default: SpringConfig;
};
/**
 * Creates a spring animation driven by fragment index.
 *
 * Spring animations have natural, physics-based motion that feels
 * more organic than linear interpolation.
 *
 * @example
 * ```tsx
 * const fragment = useFragment();
 *
 * // Basic spring from 0 to 1
 * const scale = spring({ fragment });
 *
 * // Spring with delay
 * const opacity = spring({ fragment, delay: 1 });
 *
 * // Smooth spring without bounce
 * const translateY = spring({
 *   fragment,
 *   config: SpringConfigs.smooth,
 * });
 *
 * return (
 *   <div style={{
 *     transform: `scale(${scale}) translateY(${(1 - translateY) * 20}px)`,
 *     opacity
 *   }}>
 *     Hello
 *   </div>
 * );
 * ```
 */
declare function spring(options: SpringOptions): number;
/**
 * Get the natural duration of a spring in fragments.
 * The spring is considered "settled" when it's within 0.1% of the target.
 */
declare function getSpringDuration(config?: SpringConfig): number;

interface FragmentProps {
    /** The fragment index at which this content appears. Default: auto-calculated */
    at?: number;
    /** Children to render */
    children?: ReactNode;
    /** Animation type. Default: 'fade' */
    animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';
    /** Spring configuration for the animation */
    springConfig?: SpringConfig;
}
/**
 * A Fragment component that reveals content based on the current fragment index.
 *
 * @example
 * ```tsx
 * <Slide from={0} fragmentCount={4}>
 *   <h1>Title</h1>
 *   <Fragment at={1}><p>First point</p></Fragment>
 *   <Fragment at={2}><p>Second point</p></Fragment>
 *   <Fragment at={3}><p>Third point</p></Fragment>
 * </Slide>
 * ```
 */
declare function Fragment({ at, children, animation, springConfig, }: FragmentProps): React.ReactElement | null;
interface FragmentListProps {
    /** Children to wrap in fragments */
    children?: ReactNode;
    /** Starting fragment index. Default: 0 */
    startAt?: number;
    /** Animation type for all children. Default: 'fade' */
    animation?: FragmentProps['animation'];
    /** Spring configuration for all children */
    springConfig?: SpringConfig;
}
/**
 * Wraps multiple children in sequential Fragments.
 *
 * @example
 * ```tsx
 * <FragmentList>
 *   <p>First point</p>
 *   <p>Second point</p>
 *   <p>Third point</p>
 * </FragmentList>
 * ```
 */
declare function FragmentList({ children, startAt, animation, springConfig, }: FragmentListProps): React.ReactElement;

interface PresentationProps {
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
declare function Presentation({ id, component: Component, width, height, slideCount, defaultProps, schema, calculateMetadata, }: PresentationProps): React.ReactElement;

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
    /** Image source URL */
    src: string;
    /** Fallback content to show while loading */
    placeholder?: React.ReactNode;
}
/**
 * Image component that ensures images are fully loaded before rendering.
 *
 * You MUST use this component instead of native <img> elements to ensure
 * images are properly loaded before the slide is captured for export.
 *
 * @example
 * ```tsx
 * import { Img, staticFile } from '@presotion/core';
 *
 * <Img src={staticFile('photo.png')} alt="Photo" />
 * <Img src="https://example.com/image.jpg" alt="Remote image" />
 * ```
 */
declare const Img: React.ForwardRefExoticComponent<ImgProps & React.RefAttributes<HTMLImageElement>>;

/**
 * Returns the current slide index (0-based).
 *
 * Inside a Slide component, this returns the global slide index.
 *
 * @example
 * ```tsx
 * const MySlide = () => {
 *   const slide = useCurrentSlide();
 *   return <div>This is slide {slide + 1}</div>;
 * };
 * ```
 */
declare function useCurrentSlide(): number;

/**
 * Returns the current fragment index within the current slide (0-based).
 *
 * Fragments are click-driven steps within a slide. Each click advances
 * the fragment counter until all fragments are revealed.
 *
 * @example
 * ```tsx
 * const BulletList = () => {
 *   const fragment = useFragment();
 *
 *   return (
 *     <ul>
 *       <li style={{ opacity: fragment >= 0 ? 1 : 0 }}>First item</li>
 *       <li style={{ opacity: fragment >= 1 ? 1 : 0 }}>Second item</li>
 *       <li style={{ opacity: fragment >= 2 ? 1 : 0 }}>Third item</li>
 *     </ul>
 *   );
 * };
 * ```
 */
declare function useFragment(): number;
/**
 * Returns the total number of fragments in the current slide.
 */
declare function useFragmentCount(): number;

/**
 * Configuration for a presentation
 */
interface PresentationConfig {
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
interface PresentationState {
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
interface PresentationNavigation {
    /** Go to the next fragment or slide */
    next: () => void;
    /** Go to the previous fragment or slide */
    prev: () => void;
    /** Go to a specific slide */
    goToSlide: (slideIndex: number, fragmentIndex?: number) => void;
    /** Toggle presenter mode */
    togglePresenterMode: () => void;
}
interface PresentationContextValue {
    config: PresentationConfig;
    state: PresentationState;
    navigation: PresentationNavigation;
}
declare const PresentationContext: React.Context<PresentationContextValue | null>;
declare function usePresentationContext(): PresentationContextValue;

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
declare function usePresentationConfig(): PresentationConfig;

/**
 * Returns navigation controls for the presentation.
 *
 * @example
 * ```tsx
 * const NavigationButtons = () => {
 *   const { next, prev, goToSlide } = useNavigation();
 *
 *   return (
 *     <div>
 *       <button onClick={prev}>Previous</button>
 *       <button onClick={next}>Next</button>
 *       <button onClick={() => goToSlide(0)}>Go to start</button>
 *     </div>
 *   );
 * };
 * ```
 */
declare function useNavigation(): PresentationNavigation;

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
declare function useProgress(): number;

interface InterpolateOptions {
    /**
     * What to do when the input is less than the first input range value.
     * - 'extend': Continue the interpolation beyond the range
     * - 'clamp': Clamp to the first output value
     * - 'identity': Return the input value unchanged
     */
    extrapolateLeft?: 'extend' | 'clamp' | 'identity';
    /**
     * What to do when the input is greater than the last input range value.
     * - 'extend': Continue the interpolation beyond the range
     * - 'clamp': Clamp to the last output value
     * - 'identity': Return the input value unchanged
     */
    extrapolateRight?: 'extend' | 'clamp' | 'identity';
    /**
     * Easing function to apply to the interpolation.
     */
    easing?: (t: number) => number;
}
/**
 * Interpolate a value based on the fragment index.
 *
 * This is the primary way to create animations in Presotion.
 * All animations MUST be driven by the fragment index, not CSS animations.
 *
 * @param fragment - The current fragment index
 * @param inputRange - Array of fragment values to interpolate between
 * @param outputRange - Array of output values corresponding to input range
 * @param options - Interpolation options
 *
 * @example
 * ```tsx
 * const fragment = useFragment();
 *
 * // Fade in from fragment 0 to fragment 2
 * const opacity = interpolateFragment(fragment, [0, 2], [0, 1], {
 *   extrapolateRight: 'clamp',
 * });
 *
 * return <div style={{ opacity }}>Hello</div>;
 * ```
 */
declare function interpolateFragment(fragment: number, inputRange: readonly number[], outputRange: readonly number[], options?: InterpolateOptions): number;
/**
 * Alias for interpolateFragment for compatibility.
 */
declare const interpolate: typeof interpolateFragment;

/**
 * Easing functions for use with interpolateFragment.
 *
 * These can be passed to the `easing` option of interpolateFragment.
 *
 * @example
 * ```tsx
 * const opacity = interpolateFragment(fragment, [0, 3], [0, 1], {
 *   easing: Easing.inOut(Easing.quad),
 *   extrapolateRight: 'clamp',
 * });
 * ```
 */
declare const Easing: {
    /** Linear easing (no curve) */
    linear: (t: number) => number;
    /** Quadratic curve */
    quad: (t: number) => number;
    /** Cubic curve */
    cubic: (t: number) => number;
    /** Quartic curve */
    quart: (t: number) => number;
    /** Quintic curve */
    quint: (t: number) => number;
    /** Sinusoidal curve */
    sin: (t: number) => number;
    /** Exponential curve */
    exp: (t: number) => number;
    /** Circular curve */
    circle: (t: number) => number;
    /** Elastic curve with bounce effect */
    elastic: (t: number) => number;
    /** Back curve - overshoots then returns */
    back: (t: number) => number;
    /** Bounce curve */
    bounce: (t: number) => number;
    /**
     * Create an "in" easing (starts slow, ends fast)
     */
    in: (easing: (t: number) => number) => ((t: number) => number);
    /**
     * Create an "out" easing (starts fast, ends slow)
     */
    out: (easing: (t: number) => number) => ((t: number) => number);
    /**
     * Create an "in-out" easing (slow start and end, fast middle)
     */
    inOut: (easing: (t: number) => number) => ((t: number) => number);
    /**
     * Create a cubic bezier easing function.
     *
     * @example
     * ```tsx
     * const easing = Easing.bezier(0.25, 0.1, 0.25, 1.0);
     * ```
     */
    bezier: (x1: number, y1: number, x2: number, y2: number) => ((t: number) => number);
};

/**
 * Returns a URL for a file in the public folder.
 *
 * You MUST use staticFile() to reference files from the public/ folder.
 * This ensures proper encoding and works correctly when deploying to subdirectories.
 *
 * @param path - The path relative to the public folder
 * @returns An encoded URL string
 *
 * @example
 * ```tsx
 * import { staticFile } from '@presotion/core';
 *
 * // In your component
 * <img src={staticFile('logo.png')} alt="Logo" />
 * <img src={staticFile('images/hero.jpg')} alt="Hero" />
 * ```
 */
declare function staticFile(path: string): string;

/**
 * Slide-level context for tracking fragment state within a slide
 */
interface SlideContextValue {
    /** The slide index (0-based) */
    slideIndex: number;
    /** Total number of fragments in this slide */
    fragmentCount: number;
    /** Current fragment index within this slide (0-based) */
    currentFragment: number;
    /** Layout mode for the slide */
    layout: 'default' | 'none';
}

export { AbsoluteFill, type AbsoluteFillProps, Deck, type DeckProps, type DeckSlideProps, Easing, Fragment, FragmentList, type FragmentListProps, type FragmentProps, Img, type ImgProps, type InterpolateOptions, Presentation, type PresentationConfig, PresentationContext, type PresentationContextValue, type PresentationNavigation, type PresentationProps, type PresentationState, Slide, type SlideContextValue, type SlideProps, type SpringConfig, SpringConfigs, type SpringOptions, getSpringDuration, interpolate, interpolateFragment, spring, staticFile, useCurrentSlide, useFragment, useFragmentCount, useNavigation, usePresentationConfig, usePresentationContext, useProgress };
