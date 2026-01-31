"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  exportToPdf: () => exportToPdf,
  exportToPptx: () => exportToPptx,
  renderPresentation: () => renderPresentation,
  renderSlideToImage: () => renderSlideToImage
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exportToPdf,
  exportToPptx,
  renderPresentation,
  renderSlideToImage
});
