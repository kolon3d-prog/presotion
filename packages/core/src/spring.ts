export interface SpringConfig {
  /** Mass of the object. Default: 1 */
  mass?: number;
  /** Damping coefficient. Higher = less bouncy. Default: 10 */
  damping?: number;
  /** Stiffness of the spring. Higher = faster. Default: 100 */
  stiffness?: number;
}

export interface SpringOptions {
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
export const SpringConfigs = {
  /** Smooth motion without bounce - good for subtle reveals */
  smooth: { damping: 200 } as SpringConfig,
  /** Snappy motion with minimal bounce - good for UI elements */
  snappy: { damping: 20, stiffness: 200 } as SpringConfig,
  /** Bouncy entrance - good for playful animations */
  bouncy: { damping: 8 } as SpringConfig,
  /** Heavy, slow motion with small bounce */
  heavy: { damping: 15, stiffness: 80, mass: 2 } as SpringConfig,
  /** Default spring configuration */
  default: { mass: 1, damping: 10, stiffness: 100 } as SpringConfig,
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
export function spring(options: SpringOptions): number {
  const {
    fragment,
    delay = 0,
    durationInFragments,
    config = SpringConfigs.default,
    from = 0,
    to = 1,
  } = options;

  const { mass = 1, damping = 10, stiffness = 100 } = config;

  // Apply delay
  const adjustedFragment = fragment - delay;
  
  if (adjustedFragment < 0) {
    return from;
  }

  // If duration is specified, use normalized progress
  if (durationInFragments !== undefined && durationInFragments > 0) {
    const progress = Math.min(adjustedFragment / durationInFragments, 1);
    return from + (to - from) * springEasing(progress, mass, damping, stiffness);
  }

  // Calculate spring physics
  // We use fragment as a time-like parameter
  const springProgress = calculateSpringProgress(adjustedFragment, mass, damping, stiffness);
  
  return from + (to - from) * Math.min(springProgress, 1);
}

/**
 * Calculates the spring progress for a given fragment.
 */
function calculateSpringProgress(
  fragment: number,
  mass: number,
  damping: number,
  stiffness: number
): number {
  // Normalized time (fragments act like time steps)
  const t = fragment * 0.5; // Scale factor to make animations feel right
  
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  
  if (zeta < 1) {
    // Underdamped (bouncy)
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    const envelope = Math.exp(-zeta * omega0 * t);
    return 1 - envelope * (Math.cos(omegaD * t) + (zeta * omega0 / omegaD) * Math.sin(omegaD * t));
  } else if (zeta === 1) {
    // Critically damped
    return 1 - (1 + omega0 * t) * Math.exp(-omega0 * t);
  } else {
    // Overdamped
    const s1 = -omega0 * (zeta - Math.sqrt(zeta * zeta - 1));
    const s2 = -omega0 * (zeta + Math.sqrt(zeta * zeta - 1));
    return 1 - (s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s2 - s1);
  }
}

/**
 * Spring easing function for normalized progress (0-1).
 */
function springEasing(
  progress: number,
  mass: number,
  damping: number,
  stiffness: number
): number {
  // Use a simplified spring curve for normalized progress
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  
  // Scale progress to a reasonable time range
  const t = progress * 4;
  
  if (zeta >= 1) {
    // Critically or overdamped - smooth curve
    return 1 - Math.exp(-zeta * omega0 * t) * (1 + zeta * omega0 * t);
  }
  
  // Underdamped - bouncy curve
  const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
  const envelope = Math.exp(-zeta * omega0 * t);
  return 1 - envelope * Math.cos(omegaD * t);
}

/**
 * Get the natural duration of a spring in fragments.
 * The spring is considered "settled" when it's within 0.1% of the target.
 */
export function getSpringDuration(config: SpringConfig = SpringConfigs.default): number {
  const { mass = 1, damping = 10, stiffness = 100 } = config;
  
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  
  // Time to reach 99.9% of target
  // For underdamped: t ≈ -ln(0.001) / (zeta * omega0)
  // For overdamped: similar exponential decay
  const settleTime = -Math.log(0.001) / (zeta * omega0);
  
  // Convert to fragments (inverse of the scale factor in calculateSpringProgress)
  return Math.ceil(settleTime / 0.5);
}
