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
  CodeBlock: () => CodeBlock
});
module.exports = __toCommonJS(index_exports);

// src/CodeBlock.tsx
var import_react = require("react");
var import_core = require("@presotion/core");
var import_jsx_runtime = require("react/jsx-runtime");
function CodeBlock({
  children,
  language = "text",
  theme = "github-dark",
  showLineNumbers = false,
  highlightLines,
  animateLines,
  startLineNumber = 1,
  fontSize = 16,
  style,
  className
}) {
  const fragment = (0, import_core.useFragment)();
  const [highlighted, setHighlighted] = (0, import_react.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  const code = children.trim();
  const lines = (0, import_react.useMemo)(() => code.split("\n"), [code]);
  (0, import_react.useEffect)(() => {
    let cancelled = false;
    async function highlight() {
      try {
        const shiki = await import("shiki");
        const highlighter = await shiki.createHighlighter({
          themes: [theme],
          langs: [language]
        });
        if (cancelled) return;
        const html = highlighter.codeToHtml(code, {
          lang: language,
          theme
        });
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const codeElement = tempDiv.querySelector("code");
        const lineElements = codeElement?.querySelectorAll(".line") || [];
        const lineHtml = Array.from(lineElements).map((el) => el.outerHTML);
        setHighlighted({
          html,
          lines: lineHtml.length > 0 ? lineHtml : lines.map((l) => `<span class="line">${escapeHtml(l)}</span>`)
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlighted({
          html: `<pre><code>${escapeHtml(code)}</code></pre>`,
          lines: lines.map((l) => `<span class="line">${escapeHtml(l)}</span>`)
        });
        setIsLoading(false);
      }
    }
    highlight();
    return () => {
      cancelled = true;
    };
  }, [code, language, theme, lines]);
  const activeHighlightLines = (0, import_react.useMemo)(() => {
    if (!highlightLines) return /* @__PURE__ */ new Set();
    if (typeof highlightLines === "function") {
      const result = highlightLines(fragment);
      if (result === "all") {
        return new Set(lines.map((_, i) => i + 1));
      }
      return new Set(result);
    }
    return new Set(highlightLines);
  }, [highlightLines, fragment, lines]);
  const visibleLines = (0, import_react.useMemo)(() => {
    if (!animateLines) {
      return new Set(lines.map((_, i) => i + 1));
    }
    const visible = /* @__PURE__ */ new Set();
    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const animateIndex = animateLines.indexOf(lineNum);
      if (animateIndex === -1 || animateIndex <= fragment) {
        visible.add(lineNum);
      }
    }
    return visible;
  }, [animateLines, fragment, lines]);
  const containerStyle = {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize,
    lineHeight: 1.5,
    backgroundColor: "#0d1117",
    borderRadius: 8,
    overflow: "auto",
    ...style
  };
  if (isLoading || !highlighted) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className, style: containerStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { style: { margin: 0, padding: 16 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { style: { color: "#c9d1d9" }, children: code }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className, style: containerStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "table", width: "100%", padding: "16px 0" }, children: highlighted.lines.map((lineHtml, i) => {
    const lineNum = i + startLineNumber;
    const isHighlighted = activeHighlightLines.has(lineNum);
    const isVisible = visibleLines.has(lineNum);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          display: "table-row",
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHighlighted ? "rgba(56, 139, 253, 0.15)" : "transparent",
          transition: "opacity 0.2s, background-color 0.2s"
        },
        children: [
          showLineNumbers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              style: {
                display: "table-cell",
                textAlign: "right",
                paddingRight: 16,
                paddingLeft: 16,
                userSelect: "none",
                color: "#484f58",
                width: 1,
                whiteSpace: "nowrap"
              },
              children: lineNum
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              style: {
                display: "table-cell",
                paddingRight: 16,
                paddingLeft: showLineNumbers ? 0 : 16
              },
              dangerouslySetInnerHTML: { __html: lineHtml }
            }
          )
        ]
      },
      i
    );
  }) }) });
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CodeBlock
});
