export interface InterpolateOptions {
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
export function interpolateFragment(
  fragment: number,
  inputRange: readonly number[],
  outputRange: readonly number[],
  options: InterpolateOptions = {}
): number {
  const {
    extrapolateLeft = 'extend',
    extrapolateRight = 'extend',
    easing,
  } = options;

  if (inputRange.length !== outputRange.length) {
    throw new Error('inputRange and outputRange must have the same length');
  }

  if (inputRange.length < 2) {
    throw new Error('inputRange must have at least 2 values');
  }

  // Check if input is sorted
  for (let i = 1; i < inputRange.length; i++) {
    if (inputRange[i] < inputRange[i - 1]) {
      throw new Error('inputRange must be monotonically increasing');
    }
  }

  // Handle extrapolation
  if (fragment < inputRange[0]) {
    switch (extrapolateLeft) {
      case 'clamp':
        return outputRange[0];
      case 'identity':
        return fragment;
      case 'extend':
      default:
        // Continue with interpolation logic
        break;
    }
  }

  if (fragment > inputRange[inputRange.length - 1]) {
    switch (extrapolateRight) {
      case 'clamp':
        return outputRange[outputRange.length - 1];
      case 'identity':
        return fragment;
      case 'extend':
      default:
        // Continue with interpolation logic
        break;
    }
  }

  // Find the segment
  let segmentIndex = 0;
  for (let i = 1; i < inputRange.length; i++) {
    if (fragment <= inputRange[i]) {
      segmentIndex = i - 1;
      break;
    }
    segmentIndex = i - 1;
  }

  const inputStart = inputRange[segmentIndex];
  const inputEnd = inputRange[segmentIndex + 1] ?? inputRange[segmentIndex];
  const outputStart = outputRange[segmentIndex];
  const outputEnd = outputRange[segmentIndex + 1] ?? outputRange[segmentIndex];

  // Calculate progress within the segment
  let progress = inputEnd === inputStart 
    ? 1 
    : (fragment - inputStart) / (inputEnd - inputStart);

  // Apply easing if provided
  if (easing) {
    progress = easing(Math.max(0, Math.min(1, progress)));
  }

  // Linear interpolation
  return outputStart + progress * (outputEnd - outputStart);
}

/**
 * Alias for interpolateFragment for compatibility.
 */
export const interpolate = interpolateFragment;
