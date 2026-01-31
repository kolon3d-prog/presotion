"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CenterLayout: () => CenterLayout,
  CoverLayout: () => CoverLayout,
  DefaultLayout: () => DefaultLayout,
  ImageLayout: () => ImageLayout,
  ImageLeftLayout: () => ImageLeftLayout,
  ImageRightLayout: () => ImageRightLayout,
  QuoteLayout: () => QuoteLayout,
  SectionLayout: () => SectionLayout,
  TwoColsHeaderLayout: () => TwoColsHeaderLayout,
  TwoColsLayout: () => TwoColsLayout
});
module.exports = __toCommonJS(index_exports);

// src/layouts.tsx
var import_core = require("@presotion/core");
var import_jsx_runtime = require("react/jsx-runtime");
function CenterLayout({ children, style, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_core.AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        ...style
      },
      children
    }
  );
}
function DefaultLayout({ children, style, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_core.AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "column",
        padding: 80,
        ...style
      },
      children
    }
  );
}
function TwoColsLayout({
  children,
  left,
  right,
  gap = 40,
  style,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_core.AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "row",
        padding: 80,
        gap,
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: left || children }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: right })
      ]
    }
  );
}
function TwoColsHeaderLayout({
  header,
  left,
  right,
  gap = 40,
  style,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_core.AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "column",
        padding: 80,
        gap: gap / 2,
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginBottom: gap / 2 }, children: header }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "row", gap }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: left }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: right })
        ] })
      ]
    }
  );
}
function ImageLayout({
  src,
  alt = "",
  objectFit = "cover",
  children,
  style,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_core.AbsoluteFill, { className, style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        src,
        alt,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit
        }
      }
    ),
    children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_core.AbsoluteFill,
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          color: "#fff"
        },
        children
      }
    )
  ] });
}
function ImageRightLayout({
  src,
  alt = "",
  children,
  imageWidth = 50,
  style,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_core.AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "row",
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: {
              flex: `0 0 ${100 - imageWidth}%`,
              display: "flex",
              flexDirection: "column",
              padding: 80
            },
            children
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: `0 0 ${imageWidth}%`, position: "relative" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "img",
          {
            src,
            alt,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }
          }
        ) })
      ]
    }
  );
}
function ImageLeftLayout({
  src,
  alt = "",
  children,
  imageWidth = 50,
  style,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_core.AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "row",
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: `0 0 ${imageWidth}%`, position: "relative" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "img",
          {
            src,
            alt,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: {
              flex: `0 0 ${100 - imageWidth}%`,
              display: "flex",
              flexDirection: "column",
              padding: 80
            },
            children
          }
        )
      ]
    }
  );
}
function CoverLayout({
  title,
  subtitle,
  footer,
  background = "#1e1e1e",
  color = "#ffffff",
  style,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_core.AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        background,
        color,
        textAlign: "center",
        ...style
      },
      children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 72, fontWeight: 700, marginBottom: 24 }, children: title }),
        subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 36, opacity: 0.8 }, children: subtitle }),
        footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 60,
              fontSize: 24,
              opacity: 0.6
            },
            children: footer
          }
        )
      ]
    }
  );
}
function QuoteLayout({
  quote,
  author,
  style,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_core.AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 120,
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            style: {
              fontSize: 48,
              fontStyle: "italic",
              lineHeight: 1.4,
              marginBottom: 40
            },
            children: [
              '"',
              quote,
              '"'
            ]
          }
        ),
        author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: 28, opacity: 0.7 }, children: [
          "\u2014 ",
          author
        ] })
      ]
    }
  );
}
function SectionLayout({
  title,
  subtitle,
  background = "#3b82f6",
  color = "#ffffff",
  style,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_core.AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background,
        color,
        ...style
      },
      children: [
        subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 24, opacity: 0.8, marginBottom: 16 }, children: subtitle }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 64, fontWeight: 700 }, children: title })
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CenterLayout,
  CoverLayout,
  DefaultLayout,
  ImageLayout,
  ImageLeftLayout,
  ImageRightLayout,
  QuoteLayout,
  SectionLayout,
  TwoColsHeaderLayout,
  TwoColsLayout
});
