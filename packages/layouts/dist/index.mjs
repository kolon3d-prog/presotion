// src/layouts.tsx
import { AbsoluteFill } from "@presotion/core";
import { jsx, jsxs } from "react/jsx-runtime";
function CenterLayout({ children, style, className }) {
  return /* @__PURE__ */ jsx(
    AbsoluteFill,
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
  return /* @__PURE__ */ jsx(
    AbsoluteFill,
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
  return /* @__PURE__ */ jsxs(
    AbsoluteFill,
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
        /* @__PURE__ */ jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: left || children }),
        /* @__PURE__ */ jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: right })
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
  return /* @__PURE__ */ jsxs(
    AbsoluteFill,
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
        /* @__PURE__ */ jsx("div", { style: { marginBottom: gap / 2 }, children: header }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "row", gap }, children: [
          /* @__PURE__ */ jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: left }),
          /* @__PURE__ */ jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: right })
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
  return /* @__PURE__ */ jsxs(AbsoluteFill, { className, style, children: [
    /* @__PURE__ */ jsx(
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
    children && /* @__PURE__ */ jsx(
      AbsoluteFill,
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
  return /* @__PURE__ */ jsxs(
    AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "row",
        ...style
      },
      children: [
        /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx("div", { style: { flex: `0 0 ${imageWidth}%`, position: "relative" }, children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
    AbsoluteFill,
    {
      className,
      style: {
        display: "flex",
        flexDirection: "row",
        ...style
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: { flex: `0 0 ${imageWidth}%`, position: "relative" }, children: /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
    AbsoluteFill,
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
        title && /* @__PURE__ */ jsx("div", { style: { fontSize: 72, fontWeight: 700, marginBottom: 24 }, children: title }),
        subtitle && /* @__PURE__ */ jsx("div", { style: { fontSize: 36, opacity: 0.8 }, children: subtitle }),
        footer && /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
    AbsoluteFill,
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
        /* @__PURE__ */ jsxs(
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
        author && /* @__PURE__ */ jsxs("div", { style: { fontSize: 28, opacity: 0.7 }, children: [
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
  return /* @__PURE__ */ jsxs(
    AbsoluteFill,
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
        subtitle && /* @__PURE__ */ jsx("div", { style: { fontSize: 24, opacity: 0.8, marginBottom: 16 }, children: subtitle }),
        /* @__PURE__ */ jsx("div", { style: { fontSize: 64, fontWeight: 700 }, children: title })
      ]
    }
  );
}
export {
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
};
