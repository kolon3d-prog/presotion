export interface ExportOptions {
  /** ID of the presentation to export */
  compositionId: string;
  /** Output file path */
  outputPath: string;
  /** Width in pixels. Default: 1920 */
  width?: number;
  /** Height in pixels. Default: 1080 */
  height?: number;
  /** Input props to pass to the presentation */
  inputProps?: Record<string, any>;
  /** Specific slides to export (0-indexed). If not specified, exports all. */
  slides?: number[];
}

export interface PdfExportOptions extends ExportOptions {
  /** PDF quality (0-100). Default: 100 */
  quality?: number;
}

export interface PptxExportOptions extends ExportOptions {
  /** Include speaker notes. Default: true */
  includeNotes?: boolean;
}

export interface RenderOptions {
  /** ID of the presentation to render */
  compositionId: string;
  /** Input props */
  inputProps?: Record<string, any>;
  /** Slide index to render */
  slideIndex?: number;
  /** Fragment index to render */
  fragmentIndex?: number;
}

/**
 * Export a presentation to PDF.
 * 
 * Requires Playwright to be installed.
 * 
 * @example
 * ```ts
 * import { exportToPdf } from '@presotion/renderer';
 * 
 * await exportToPdf({
 *   compositionId: 'my-talk',
 *   outputPath: 'presentation.pdf',
 * });
 * ```
 */
export async function exportToPdf(options: PdfExportOptions): Promise<void> {
  const {
    compositionId,
    outputPath,
    width = 1920,
    height = 1080,
    quality = 100,
    slides,
  } = options;

  // Dynamic import to make playwright optional
  let playwright;
  try {
    playwright = await import('playwright');
  } catch {
    throw new Error(
      'Playwright is required for PDF export. Install it with: npm install playwright'
    );
  }

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width, height });
  
  // TODO: Load the actual presentation server
  // For now, this is a placeholder
  console.log(`Exporting presentation "${compositionId}" to ${outputPath}`);
  console.log(`Resolution: ${width}x${height}`);
  
  await browser.close();
  
  console.log('PDF export complete!');
}

/**
 * Export a presentation to PPTX.
 * 
 * @example
 * ```ts
 * import { exportToPptx } from '@presotion/renderer';
 * 
 * await exportToPptx({
 *   compositionId: 'my-talk',
 *   outputPath: 'presentation.pptx',
 * });
 * ```
 */
export async function exportToPptx(options: PptxExportOptions): Promise<void> {
  const { compositionId, outputPath, includeNotes = true } = options;

  // TODO: Implement PPTX export using pptxgenjs
  console.log(`Exporting presentation "${compositionId}" to ${outputPath}`);
  console.log(`Include notes: ${includeNotes}`);
  console.log('PPTX export coming soon!');
}

/**
 * Render a presentation or slide to HTML string.
 * 
 * @example
 * ```ts
 * import { renderPresentation } from '@presotion/renderer';
 * 
 * const html = await renderPresentation({
 *   compositionId: 'my-talk',
 * });
 * ```
 */
export async function renderPresentation(options: RenderOptions): Promise<string> {
  const { compositionId, inputProps, slideIndex, fragmentIndex } = options;

  // TODO: Implement SSR rendering
  console.log(`Rendering presentation "${compositionId}"`);
  
  return `<!DOCTYPE html>
<html>
<head>
  <title>${compositionId}</title>
</head>
<body>
  <div id="presotion-root"></div>
</body>
</html>`;
}

/**
 * Render a single slide as PNG image.
 * 
 * @example
 * ```ts
 * import { renderSlideToImage } from '@presotion/renderer';
 * 
 * const buffer = await renderSlideToImage({
 *   compositionId: 'my-talk',
 *   slideIndex: 0,
 * });
 * ```
 */
export async function renderSlideToImage(options: RenderOptions): Promise<Buffer> {
  const { compositionId, slideIndex = 0, fragmentIndex = 0 } = options;

  // Dynamic import to make playwright optional
  let playwright;
  try {
    playwright = await import('playwright');
  } catch {
    throw new Error(
      'Playwright is required for image rendering. Install it with: npm install playwright'
    );
  }

  // TODO: Implement actual slide rendering
  console.log(`Rendering slide ${slideIndex} of "${compositionId}"`);
  
  return Buffer.from('');
}
