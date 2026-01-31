import React, { ReactNode, Children, cloneElement, isValidElement } from 'react';
import { useFragment } from '../hooks/useFragment';
import { interpolateFragment } from '../interpolate';
import { spring, SpringConfig, SpringConfigs } from '../spring';

export interface FragmentProps {
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
export function Fragment({
  at = 0,
  children,
  animation = 'fade',
  springConfig = SpringConfigs.smooth,
}: FragmentProps): React.ReactElement | null {
  const currentFragment = useFragment();

  // Calculate visibility
  const isVisible = currentFragment >= at;
  const progress = isVisible
    ? spring({
        fragment: currentFragment - at,
        config: springConfig,
      })
    : 0;

  if (animation === 'none') {
    return isVisible ? <>{children}</> : null;
  }

  // Calculate animation styles
  let animationStyle: React.CSSProperties = {};

  switch (animation) {
    case 'fade':
      animationStyle = { opacity: progress };
      break;
    case 'slide-up':
      animationStyle = {
        opacity: progress,
        transform: `translateY(${(1 - progress) * 20}px)`,
      };
      break;
    case 'slide-down':
      animationStyle = {
        opacity: progress,
        transform: `translateY(${(1 - progress) * -20}px)`,
      };
      break;
    case 'slide-left':
      animationStyle = {
        opacity: progress,
        transform: `translateX(${(1 - progress) * 20}px)`,
      };
      break;
    case 'slide-right':
      animationStyle = {
        opacity: progress,
        transform: `translateX(${(1 - progress) * -20}px)`,
      };
      break;
    case 'scale':
      animationStyle = {
        opacity: progress,
        transform: `scale(${0.9 + progress * 0.1})`,
      };
      break;
  }

  return (
    <div style={{ ...animationStyle, willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
}

export interface FragmentListProps {
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
export function FragmentList({
  children,
  startAt = 0,
  animation = 'fade',
  springConfig,
}: FragmentListProps): React.ReactElement {
  const childArray = Children.toArray(children);

  return (
    <>
      {childArray.map((child, index) => (
        <Fragment
          key={index}
          at={startAt + index}
          animation={animation}
          springConfig={springConfig}
        >
          {child}
        </Fragment>
      ))}
    </>
  );
}
