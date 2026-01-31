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
export const Easing = {
  /** Linear easing (no curve) */
  linear: (t: number): number => t,

  /** Quadratic curve */
  quad: (t: number): number => t * t,

  /** Cubic curve */
  cubic: (t: number): number => t * t * t,

  /** Quartic curve */
  quart: (t: number): number => t * t * t * t,

  /** Quintic curve */
  quint: (t: number): number => t * t * t * t * t,

  /** Sinusoidal curve */
  sin: (t: number): number => 1 - Math.cos((t * Math.PI) / 2),

  /** Exponential curve */
  exp: (t: number): number => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),

  /** Circular curve */
  circle: (t: number): number => 1 - Math.sqrt(1 - t * t),

  /** Elastic curve with bounce effect */
  elastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },

  /** Back curve - overshoots then returns */
  back: (t: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },

  /** Bounce curve */
  bounce: (t: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;
    let x = 1 - t;

    if (x < 1 / d1) {
      return 1 - n1 * x * x;
    } else if (x < 2 / d1) {
      return 1 - (n1 * (x -= 1.5 / d1) * x + 0.75);
    } else if (x < 2.5 / d1) {
      return 1 - (n1 * (x -= 2.25 / d1) * x + 0.9375);
    } else {
      return 1 - (n1 * (x -= 2.625 / d1) * x + 0.984375);
    }
  },

  /**
   * Create an "in" easing (starts slow, ends fast)
   */
  in: (easing: (t: number) => number): ((t: number) => number) => {
    return easing;
  },

  /**
   * Create an "out" easing (starts fast, ends slow)
   */
  out: (easing: (t: number) => number): ((t: number) => number) => {
    return (t: number) => 1 - easing(1 - t);
  },

  /**
   * Create an "in-out" easing (slow start and end, fast middle)
   */
  inOut: (easing: (t: number) => number): ((t: number) => number) => {
    return (t: number) => {
      if (t < 0.5) {
        return easing(t * 2) / 2;
      }
      return 1 - easing((1 - t) * 2) / 2;
    };
  },

  /**
   * Create a cubic bezier easing function.
   * 
   * @example
   * ```tsx
   * const easing = Easing.bezier(0.25, 0.1, 0.25, 1.0);
   * ```
   */
  bezier: (x1: number, y1: number, x2: number, y2: number): ((t: number) => number) => {
    // Attempt to find the t value for a given x using Newton's method
    const sampleCurveX = (t: number) =>
      ((1 - 3 * x2 + 3 * x1) * t + (3 * x2 - 6 * x1)) * t + 3 * x1 * t;

    const sampleCurveY = (t: number) =>
      ((1 - 3 * y2 + 3 * y1) * t + (3 * y2 - 6 * y1)) * t + 3 * y1 * t;

    const sampleCurveDerivativeX = (t: number) =>
      (3 - 9 * x2 + 9 * x1) * t * t + (6 * x2 - 12 * x1) * t + 3 * x1;

    const solveCurveX = (x: number): number => {
      let t = x;
      for (let i = 0; i < 8; i++) {
        const error = sampleCurveX(t) - x;
        if (Math.abs(error) < 1e-6) {
          return t;
        }
        const derivative = sampleCurveDerivativeX(t);
        if (Math.abs(derivative) < 1e-6) {
          break;
        }
        t -= error / derivative;
      }
      return t;
    };

    return (x: number): number => {
      if (x === 0 || x === 1) {
        return x;
      }
      return sampleCurveY(solveCurveX(x));
    };
  },
};
