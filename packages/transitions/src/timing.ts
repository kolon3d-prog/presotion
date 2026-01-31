import { CSSProperties } from 'react';

/**
 * Transition presentation interface.
 * Defines how entering and exiting slides should be styled.
 */
export interface TransitionPresentation {
  /** Styles for the entering slide */
  enter: (progress: number) => CSSProperties;
  /** Styles for the exiting slide */
  exit: (progress: number) => CSSProperties;
}

/**
 * Timing interface for transitions.
 */
export interface TransitionTiming {
  /** Duration of the transition in milliseconds */
  getDurationMs: () => number;
  /** Easing function */
  getProgress: (elapsed: number) => number;
}

/**
 * Create a linear timing for transitions.
 * 
 * @example
 * ```tsx
 * <TransitionDeck.Transition
 *   presentation={fade()}
 *   timing={linearTiming({ durationMs: 300 })}
 * />
 * ```
 */
export function linearTiming(options: { durationMs: number }): TransitionTiming {
  const { durationMs } = options;
  
  return {
    getDurationMs: () => durationMs,
    getProgress: (elapsed: number) => Math.min(elapsed / durationMs, 1),
  };
}

/**
 * Create a spring-based timing for transitions.
 * 
 * @example
 * ```tsx
 * <TransitionDeck.Transition
 *   presentation={slide({ direction: 'from-left' })}
 *   timing={springTiming({ config: { damping: 200 } })}
 * />
 * ```
 */
export function springTiming(options: {
  config?: { damping?: number; stiffness?: number; mass?: number };
  durationMs?: number;
}): TransitionTiming {
  const { config = {}, durationMs = 400 } = options;
  const { damping = 20, stiffness = 100, mass = 1 } = config;
  
  return {
    getDurationMs: () => durationMs,
    getProgress: (elapsed: number) => {
      const t = elapsed / durationMs;
      if (t >= 1) return 1;
      
      // Simplified spring approximation
      const omega0 = Math.sqrt(stiffness / mass);
      const zeta = damping / (2 * Math.sqrt(stiffness * mass));
      
      if (zeta >= 1) {
        // Critically or overdamped
        return 1 - Math.exp(-zeta * omega0 * t * 4) * (1 + zeta * omega0 * t * 4);
      }
      
      // Underdamped
      const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
      const envelope = Math.exp(-zeta * omega0 * t * 4);
      return 1 - envelope * Math.cos(omegaD * t * 4);
    },
  };
}

/**
 * Create an eased timing for transitions.
 * 
 * @example
 * ```tsx
 * <TransitionDeck.Transition
 *   presentation={fade()}
 *   timing={easedTiming({ durationMs: 300, easing: 'ease-in-out' })}
 * />
 * ```
 */
export function easedTiming(options: {
  durationMs: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}): TransitionTiming {
  const { durationMs, easing = 'ease-in-out' } = options;
  
  const easingFunctions: Record<string, (t: number) => number> = {
    'linear': (t) => t,
    'ease': (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    'ease-in': (t) => t * t,
    'ease-out': (t) => 1 - (1 - t) * (1 - t),
    'ease-in-out': (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  };
  
  const easingFn = easingFunctions[easing] || easingFunctions['ease-in-out'];
  
  return {
    getDurationMs: () => durationMs,
    getProgress: (elapsed: number) => easingFn(Math.min(elapsed / durationMs, 1)),
  };
}
