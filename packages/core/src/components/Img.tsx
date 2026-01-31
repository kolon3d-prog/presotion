import React, { ImgHTMLAttributes, forwardRef, useState, useEffect } from 'react';

export interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
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
export const Img = forwardRef<HTMLImageElement, ImgProps>(
  ({ src, placeholder, style, ...props }, ref) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      setLoaded(false);
      setError(false);

      const img = new Image();
      img.src = src;
      
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);

      // If already cached
      if (img.complete) {
        setLoaded(true);
      }

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }, [src]);

    if (error) {
      return (
        <div
          style={{
            ...style,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#666',
          }}
        >
          Failed to load image
        </div>
      );
    }

    if (!loaded && placeholder) {
      return <>{placeholder}</>;
    }

    return (
      <img
        ref={ref}
        src={src}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
        {...props}
      />
    );
  }
);

Img.displayName = 'Img';
