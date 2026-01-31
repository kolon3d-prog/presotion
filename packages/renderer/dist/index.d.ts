interface ExportOptions {
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
interface PdfExportOptions extends ExportOptions {
    /** PDF quality (0-100). Default: 100 */
    quality?: number;
}
interface PptxExportOptions extends ExportOptions {
    /** Include speaker notes. Default: true */
    includeNotes?: boolean;
}
interface RenderOptions {
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
declare function exportToPdf(options: PdfExportOptions): Promise<void>;
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
declare function exportToPptx(options: PptxExportOptions): Promise<void>;
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
declare function renderPresentation(options: RenderOptions): Promise<string>;
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
declare function renderSlideToImage(options: RenderOptions): Promise<Buffer>;

export { type ExportOptions, type PdfExportOptions, type PptxExportOptions, type RenderOptions, exportToPdf, exportToPptx, renderPresentation, renderSlideToImage };
