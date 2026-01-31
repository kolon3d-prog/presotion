import React, { ReactNode, CSSProperties } from 'react';

interface CenterLayoutProps {
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
}
/**
 * Center layout - content is centered both horizontally and vertically.
 */
declare function CenterLayout({ children, style, className }: CenterLayoutProps): React.ReactElement;
interface DefaultLayoutProps {
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
}
/**
 * Default layout - content flows from top with padding.
 */
declare function DefaultLayout({ children, style, className }: DefaultLayoutProps): React.ReactElement;
interface TwoColsLayoutProps {
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
declare function TwoColsLayout({ children, left, right, gap, style, className, }: TwoColsLayoutProps): React.ReactElement;
interface TwoColsHeaderLayoutProps {
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
declare function TwoColsHeaderLayout({ header, left, right, gap, style, className, }: TwoColsHeaderLayoutProps): React.ReactElement;
interface ImageLayoutProps {
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
declare function ImageLayout({ src, alt, objectFit, children, style, className, }: ImageLayoutProps): React.ReactElement;
interface ImageRightLayoutProps {
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
declare function ImageRightLayout({ src, alt, children, imageWidth, style, className, }: ImageRightLayoutProps): React.ReactElement;
interface ImageLeftLayoutProps {
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
declare function ImageLeftLayout({ src, alt, children, imageWidth, style, className, }: ImageLeftLayoutProps): React.ReactElement;
interface CoverLayoutProps {
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
declare function CoverLayout({ title, subtitle, footer, background, color, style, className, }: CoverLayoutProps): React.ReactElement;
interface QuoteLayoutProps {
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
declare function QuoteLayout({ quote, author, style, className, }: QuoteLayoutProps): React.ReactElement;
interface SectionLayoutProps {
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
declare function SectionLayout({ title, subtitle, background, color, style, className, }: SectionLayoutProps): React.ReactElement;

export { CenterLayout, type CenterLayoutProps, CoverLayout, type CoverLayoutProps, DefaultLayout, type DefaultLayoutProps, ImageLayout, type ImageLayoutProps, ImageLeftLayout, type ImageLeftLayoutProps, ImageRightLayout, type ImageRightLayoutProps, QuoteLayout, type QuoteLayoutProps, SectionLayout, type SectionLayoutProps, TwoColsHeaderLayout, type TwoColsHeaderLayoutProps, TwoColsLayout, type TwoColsLayoutProps };
