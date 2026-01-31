// src/CodeBlock.tsx
import { useEffect, useState, useMemo } from "react";
import { useFragment } from "@presotion/core";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const fragment = useFragment();
  const [highlighted, setHighlighted] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const code = children.trim();
  const lines = useMemo(() => code.split("\n"), [code]);
  useEffect(() => {
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
  const activeHighlightLines = useMemo(() => {
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
  const visibleLines = useMemo(() => {
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
    return /* @__PURE__ */ jsx("div", { className, style: containerStyle, children: /* @__PURE__ */ jsx("pre", { style: { margin: 0, padding: 16 }, children: /* @__PURE__ */ jsx("code", { style: { color: "#c9d1d9" }, children: code }) }) });
  }
  return /* @__PURE__ */ jsx("div", { className, style: containerStyle, children: /* @__PURE__ */ jsx("div", { style: { display: "table", width: "100%", padding: "16px 0" }, children: highlighted.lines.map((lineHtml, i) => {
    const lineNum = i + startLineNumber;
    const isHighlighted = activeHighlightLines.has(lineNum);
    const isVisible = visibleLines.has(lineNum);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          display: "table-row",
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHighlighted ? "rgba(56, 139, 253, 0.15)" : "transparent",
          transition: "opacity 0.2s, background-color 0.2s"
        },
        children: [
          showLineNumbers && /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(
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
export {
  CodeBlock
};
