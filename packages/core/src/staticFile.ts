/**
 * Returns a URL for a file in the public folder.
 * 
 * You MUST use staticFile() to reference files from the public/ folder.
 * This ensures proper encoding and works correctly when deploying to subdirectories.
 * 
 * @param path - The path relative to the public folder
 * @returns An encoded URL string
 * 
 * @example
 * ```tsx
 * import { staticFile } from '@presotion/core';
 * 
 * // In your component
 * <img src={staticFile('logo.png')} alt="Logo" />
 * <img src={staticFile('images/hero.jpg')} alt="Hero" />
 * ```
 */
export function staticFile(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Encode special characters in the path
  const encodedPath = cleanPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  
  // In browser, use the base URL; in Node, return relative path
  if (typeof window !== 'undefined') {
    const base = window.location.origin;
    return `${base}/${encodedPath}`;
  }
  
  return `/${encodedPath}`;
}
