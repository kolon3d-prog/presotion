import React, { ReactNode, CSSProperties } from 'react';
import { AbsoluteFill } from '@presotion/core';

export interface CenterLayoutProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * Center layout - content is centered both horizontally and vertically.
 */
export function CenterLayout({ children, style, className }: CenterLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

export interface DefaultLayoutProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * Default layout - content flows from top with padding.
 */
export function DefaultLayout({ children, style, className }: DefaultLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 80,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

export interface TwoColsLayoutProps {
  children?: ReactNode;
  /** Content for the left column */
  left?: ReactNode;
  /** Content for the right column */
  right?: ReactNode;
  /** Gap between columns in pixels. Default: 40 */
  gap?: number;
  style?: CSSProperties;
  className?: string;
}

/**
 * Two columns layout - splits content into left and right columns.
 */
export function TwoColsLayout({
  children,
  left,
  right,
  gap = 40,
  style,
  className,
}: TwoColsLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 80,
        gap,
        ...style,
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {left || children}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {right}
      </div>
    </AbsoluteFill>
  );
}

export interface TwoColsHeaderLayoutProps {
  /** Header content */
  header?: ReactNode;
  /** Content for the left column */
  left?: ReactNode;
  /** Content for the right column */
  right?: ReactNode;
  /** Gap between columns in pixels. Default: 40 */
  gap?: number;
  style?: CSSProperties;
  className?: string;
}

/**
 * Two columns with header layout.
 */
export function TwoColsHeaderLayout({
  header,
  left,
  right,
  gap = 40,
  style,
  className,
}: TwoColsHeaderLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 80,
        gap: gap / 2,
        ...style,
      }}
    >
      <div style={{ marginBottom: gap / 2 }}>{header}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {left}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {right}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export interface ImageLayoutProps {
  /** Image source URL */
  src: string;
  /** Alt text for the image */
  alt?: string;
  /** Object fit style. Default: 'cover' */
  objectFit?: 'cover' | 'contain' | 'fill';
  /** Overlay content */
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * Full-screen image layout.
 */
export function ImageLayout({
  src,
  alt = '',
  objectFit = 'cover',
  children,
  style,
  className,
}: ImageLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill className={className} style={style}>
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit,
        }}
      />
      {children && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 80,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            color: '#fff',
          }}
        >
          {children}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

export interface ImageRightLayoutProps {
  /** Image source URL */
  src: string;
  /** Alt text for the image */
  alt?: string;
  /** Content for the left side */
  children?: ReactNode;
  /** Width of the image column as percentage. Default: 50 */
  imageWidth?: number;
  style?: CSSProperties;
  className?: string;
}

/**
 * Layout with content on left and image on right.
 */
export function ImageRightLayout({
  src,
  alt = '',
  children,
  imageWidth = 50,
  style,
  className,
}: ImageRightLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        ...style,
      }}
    >
      <div
        style={{
          flex: `0 0 ${100 - imageWidth}%`,
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
        }}
      >
        {children}
      </div>
      <div style={{ flex: `0 0 ${imageWidth}%`, position: 'relative' }}>
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

export interface ImageLeftLayoutProps {
  /** Image source URL */
  src: string;
  /** Alt text for the image */
  alt?: string;
  /** Content for the right side */
  children?: ReactNode;
  /** Width of the image column as percentage. Default: 50 */
  imageWidth?: number;
  style?: CSSProperties;
  className?: string;
}

/**
 * Layout with image on left and content on right.
 */
export function ImageLeftLayout({
  src,
  alt = '',
  children,
  imageWidth = 50,
  style,
  className,
}: ImageLeftLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        ...style,
      }}
    >
      <div style={{ flex: `0 0 ${imageWidth}%`, position: 'relative' }}>
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div
        style={{
          flex: `0 0 ${100 - imageWidth}%`,
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
}

export interface CoverLayoutProps {
  /** Title text */
  title?: ReactNode;
  /** Subtitle text */
  subtitle?: ReactNode;
  /** Author or date */
  footer?: ReactNode;
  /** Background color or gradient */
  background?: string;
  /** Text color */
  color?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * Cover/title slide layout.
 */
export function CoverLayout({
  title,
  subtitle,
  footer,
  background = '#1e1e1e',
  color = '#ffffff',
  style,
  className,
}: CoverLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        background,
        color,
        textAlign: 'center',
        ...style,
      }}
    >
      {title && (
        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 24 }}>
          {title}
        </div>
      )}
      {subtitle && (
        <div style={{ fontSize: 36, opacity: 0.8 }}>
          {subtitle}
        </div>
      )}
      {footer && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            fontSize: 24,
            opacity: 0.6,
          }}
        >
          {footer}
        </div>
      )}
    </AbsoluteFill>
  );
}

export interface QuoteLayoutProps {
  /** The quote text */
  quote: ReactNode;
  /** Attribution/author */
  author?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * Quote layout with large quote and attribution.
 */
export function QuoteLayout({
  quote,
  author,
  style,
  className,
}: QuoteLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 120,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontStyle: 'italic',
          lineHeight: 1.4,
          marginBottom: 40,
        }}
      >
        "{quote}"
      </div>
      {author && (
        <div style={{ fontSize: 28, opacity: 0.7 }}>
          — {author}
        </div>
      )}
    </AbsoluteFill>
  );
}

export interface SectionLayoutProps {
  /** Section title */
  title: ReactNode;
  /** Section number or subtitle */
  subtitle?: ReactNode;
  background?: string;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * Section divider layout.
 */
export function SectionLayout({
  title,
  subtitle,
  background = '#3b82f6',
  color = '#ffffff',
  style,
  className,
}: SectionLayoutProps): React.ReactElement {
  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background,
        color,
        ...style,
      }}
    >
      {subtitle && (
        <div style={{ fontSize: 24, opacity: 0.8, marginBottom: 16 }}>
          {subtitle}
        </div>
      )}
      <div style={{ fontSize: 64, fontWeight: 700 }}>{title}</div>
    </AbsoluteFill>
  );
}
