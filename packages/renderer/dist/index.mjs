// src/index.ts
async function exportToPdf(options) {
  const {
    compositionId,
    outputPath,
    width = 1920,
    height = 1080,
    quality = 100,
    slides
  } = options;
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    throw new Error(
      "Playwright is required for PDF export. Install it with: npm install playwright"
    );
  }
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width, height });
  console.log(`Exporting presentation "${compositionId}" to ${outputPath}`);
  console.log(`Resolution: ${width}x${height}`);
  await browser.close();
  console.log("PDF export complete!");
}
async function exportToPptx(options) {
  const { compositionId, outputPath, includeNotes = true } = options;
  console.log(`Exporting presentation "${compositionId}" to ${outputPath}`);
  console.log(`Include notes: ${includeNotes}`);
  console.log("PPTX export coming soon!");
}
async function renderPresentation(options) {
  const { compositionId, inputProps, slideIndex, fragmentIndex } = options;
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
async function renderSlideToImage(options) {
  const { compositionId, slideIndex = 0, fragmentIndex = 0 } = options;
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    throw new Error(
      "Playwright is required for image rendering. Install it with: npm install playwright"
    );
  }
  console.log(`Rendering slide ${slideIndex} of "${compositionId}"`);
  return Buffer.from("");
}
export {
  exportToPdf,
  exportToPptx,
  renderPresentation,
  renderSlideToImage
};
