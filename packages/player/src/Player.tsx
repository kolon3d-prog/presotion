import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  CSSProperties,
} from 'react';
import {
  PresentationContext,
  PresentationConfig,
  PresentationState,
  PresentationNavigation,
  PresentationContextValue,
} from '@presotion/core';

export interface PlayerProps {
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

export interface PlayerRef {
  /** Go to next fragment/slide */
  next: () => void;
  /** Go to previous fragment/slide */
  prev: () => void;
  /** Go to specific slide */
  goToSlide: (slideIndex: number, fragmentIndex?: number) => void;
  /** Get current state */
  getState: () => { slide: number; fragment: number };
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
export const Player = forwardRef<PlayerRef, PlayerProps>(
  (
    {
      component: Component,
      inputProps = {},
      compositionWidth = 1920,
      compositionHeight = 1080,
      slideCount,
      fragmentCounts = [],
      style,
      className,
      controls = true,
      allowKeyboard = true,
      allowClick = true,
      loop = false,
      onSlideChange,
      onEnd,
      initialSlide = 0,
      initialFragment = 0,
      autoplay = null,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(autoplay === null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [state, setState] = useState<PresentationState>({
      currentSlide: initialSlide,
      currentFragment: initialFragment,
      isPresenterMode: false,
    });

    // Get fragment count for a slide
    const getFragmentCount = useCallback(
      (slideIndex: number) => fragmentCounts[slideIndex] ?? 1,
      [fragmentCounts]
    );

    const config: PresentationConfig = useMemo(
      () => ({
        id: 'player',
        width: compositionWidth,
        height: compositionHeight,
        slideCount,
      }),
      [compositionWidth, compositionHeight, slideCount]
    );

    const navigation: PresentationNavigation = useMemo(
      () => ({
        next: () => {
          setState((prev) => {
            const currentFragmentCount = getFragmentCount(prev.currentSlide);

            // If there are more fragments, advance fragment
            if (prev.currentFragment < currentFragmentCount - 1) {
              return { ...prev, currentFragment: prev.currentFragment + 1 };
            }

            // If there are more slides, go to next slide
            if (prev.currentSlide < slideCount - 1) {
              return { ...prev, currentSlide: prev.currentSlide + 1, currentFragment: 0 };
            }

            // If loop, go back to start
            if (loop) {
              return { ...prev, currentSlide: 0, currentFragment: 0 };
            }

            // Trigger onEnd
            onEnd?.();
            return prev;
          });
        },

        prev: () => {
          setState((prev) => {
            // If there are previous fragments, go back
            if (prev.currentFragment > 0) {
              return { ...prev, currentFragment: prev.currentFragment - 1 };
            }

            // If there are previous slides, go to last fragment of previous slide
            if (prev.currentSlide > 0) {
              const prevFragmentCount = getFragmentCount(prev.currentSlide - 1);
              return {
                ...prev,
                currentSlide: prev.currentSlide - 1,
                currentFragment: prevFragmentCount - 1,
              };
            }

            return prev;
          });
        },

        goToSlide: (slideIndex: number, fragmentIndex: number = 0) => {
          if (slideIndex >= 0 && slideIndex < slideCount) {
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
      [getFragmentCount, slideCount, loop, onEnd]
    );

    // Notify on slide change
    useEffect(() => {
      onSlideChange?.(state.currentSlide, state.currentFragment);
    }, [state.currentSlide, state.currentFragment, onSlideChange]);

    // Keyboard navigation
    useEffect(() => {
      if (!allowKeyboard) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowRight':
          case ' ':
          case 'Enter':
            e.preventDefault();
            navigation.next();
            break;
          case 'ArrowLeft':
          case 'Backspace':
            e.preventDefault();
            navigation.prev();
            break;
          case 'Home':
            e.preventDefault();
            navigation.goToSlide(0);
            break;
          case 'End':
            e.preventDefault();
            navigation.goToSlide(slideCount - 1);
            break;
          case 'f':
          case 'F':
            e.preventDefault();
            toggleFullscreen();
            break;
          case 'Escape':
            if (isFullscreen) {
              e.preventDefault();
              exitFullscreen();
            }
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [allowKeyboard, navigation, slideCount, isFullscreen]);

    // Click navigation
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (!allowClick) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;

        // Click on left third goes back, right two-thirds goes forward
        if (x < rect.width / 3) {
          navigation.prev();
        } else {
          navigation.next();
        }
      },
      [allowClick, navigation]
    );

    // Autoplay
    useEffect(() => {
      if (autoplay === null || isPaused) return;

      const interval = setInterval(() => {
        navigation.next();
      }, autoplay);

      return () => clearInterval(interval);
    }, [autoplay, isPaused, navigation]);

    // Fullscreen
    const toggleFullscreen = useCallback(() => {
      if (!containerRef.current) return;

      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }, []);

    const exitFullscreen = useCallback(() => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }, []);

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        next: navigation.next,
        prev: navigation.prev,
        goToSlide: navigation.goToSlide,
        getState: () => ({
          slide: state.currentSlide,
          fragment: state.currentFragment,
        }),
        pause: () => setIsPaused(true),
        play: () => setIsPaused(false),
        toggleFullscreen,
      }),
      [navigation, state, toggleFullscreen]
    );

    const contextValue: PresentationContextValue = useMemo(
      () => ({ config, state, navigation }),
      [config, state, navigation]
    );

    // Calculate scale to fit container
    const [scale, setScale] = useState(1);
    useEffect(() => {
      const updateScale = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scaleX = container.clientWidth / compositionWidth;
        const scaleY = container.clientHeight / compositionHeight;
        setScale(Math.min(scaleX, scaleY));
      };

      updateScale();
      window.addEventListener('resize', updateScale);
      return () => window.removeEventListener('resize', updateScale);
    }, [compositionWidth, compositionHeight]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          overflow: 'hidden',
          cursor: allowClick ? 'pointer' : 'default',
          ...style,
        }}
        onClick={handleClick}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: compositionWidth,
            height: compositionHeight,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <PresentationContext.Provider value={contextValue}>
            <Component {...inputProps} />
          </PresentationContext.Provider>
        </div>

        {controls && (
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
              userSelect: 'none',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={navigation.prev}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              ◀
            </button>
            <span>
              {state.currentSlide + 1} / {slideCount}
            </span>
            <button
              onClick={navigation.next}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              ▶
            </button>
            <button
              onClick={toggleFullscreen}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                padding: 4,
                marginLeft: 8,
              }}
            >
              ⛶
            </button>
          </div>
        )}
      </div>
    );
  }
);

Player.displayName = 'Player';
