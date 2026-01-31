import React, { CSSProperties, forwardRef, ReactNode } from 'react';

export interface AbsoluteFillProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const absoluteFillStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

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
export const AbsoluteFill = forwardRef<HTMLDivElement, AbsoluteFillProps>(
  ({ children, style, className }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...absoluteFillStyle,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

AbsoluteFill.displayName = 'AbsoluteFill';
