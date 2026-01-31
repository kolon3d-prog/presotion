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
  Player: () => Player
});
module.exports = __toCommonJS(index_exports);

// src/Player.tsx
var import_react = require("react");
var import_core = require("@presotion/core");
var import_jsx_runtime = require("react/jsx-runtime");
var Player = (0, import_react.forwardRef)(
  ({
    component: Component,
    inputProps = {},
    compositionWidth = 1920,
    compositionHeight = 1080,
    slideCount,
    fragmentCounts = [],
    style,
    className,
    controls = true,
    allowKeyboard = true,
    allowClick = true,
    loop = false,
    onSlideChange,
    onEnd,
    initialSlide = 0,
    initialFragment = 0,
    autoplay = null
  }, ref) => {
    const containerRef = (0, import_react.useRef)(null);
    const [isPaused, setIsPaused] = (0, import_react.useState)(autoplay === null);
    const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
    const [state, setState] = (0, import_react.useState)({
      currentSlide: initialSlide,
      currentFragment: initialFragment,
      isPresenterMode: false
    });
    const getFragmentCount = (0, import_react.useCallback)(
      (slideIndex) => fragmentCounts[slideIndex] ?? 1,
      [fragmentCounts]
    );
    const config = (0, import_react.useMemo)(
      () => ({
        id: "player",
        width: compositionWidth,
        height: compositionHeight,
        slideCount
      }),
      [compositionWidth, compositionHeight, slideCount]
    );
    const navigation = (0, import_react.useMemo)(
      () => ({
        next: () => {
          setState((prev) => {
            const currentFragmentCount = getFragmentCount(prev.currentSlide);
            if (prev.currentFragment < currentFragmentCount - 1) {
              return { ...prev, currentFragment: prev.currentFragment + 1 };
            }
            if (prev.currentSlide < slideCount - 1) {
              return { ...prev, currentSlide: prev.currentSlide + 1, currentFragment: 0 };
            }
            if (loop) {
              return { ...prev, currentSlide: 0, currentFragment: 0 };
            }
            onEnd?.();
            return prev;
          });
        },
        prev: () => {
          setState((prev) => {
            if (prev.currentFragment > 0) {
              return { ...prev, currentFragment: prev.currentFragment - 1 };
            }
            if (prev.currentSlide > 0) {
              const prevFragmentCount = getFragmentCount(prev.currentSlide - 1);
              return {
                ...prev,
                currentSlide: prev.currentSlide - 1,
                currentFragment: prevFragmentCount - 1
              };
            }
            return prev;
          });
        },
        goToSlide: (slideIndex, fragmentIndex = 0) => {
          if (slideIndex >= 0 && slideIndex < slideCount) {
            setState((prev) => ({
              ...prev,
              currentSlide: slideIndex,
              currentFragment: fragmentIndex
            }));
          }
        },
        togglePresenterMode: () => {
          setState((prev) => ({
            ...prev,
            isPresenterMode: !prev.isPresenterMode
          }));
        }
      }),
      [getFragmentCount, slideCount, loop, onEnd]
    );
    (0, import_react.useEffect)(() => {
      onSlideChange?.(state.currentSlide, state.currentFragment);
    }, [state.currentSlide, state.currentFragment, onSlideChange]);
    (0, import_react.useEffect)(() => {
      if (!allowKeyboard) return;
      const handleKeyDown = (e) => {
        switch (e.key) {
          case "ArrowRight":
          case " ":
          case "Enter":
            e.preventDefault();
            navigation.next();
            break;
          case "ArrowLeft":
          case "Backspace":
            e.preventDefault();
            navigation.prev();
            break;
          case "Home":
            e.preventDefault();
            navigation.goToSlide(0);
            break;
          case "End":
            e.preventDefault();
            navigation.goToSlide(slideCount - 1);
            break;
          case "f":
          case "F":
            e.preventDefault();
            toggleFullscreen();
            break;
          case "Escape":
            if (isFullscreen) {
              e.preventDefault();
              exitFullscreen();
            }
            break;
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [allowKeyboard, navigation, slideCount, isFullscreen]);
    const handleClick = (0, import_react.useCallback)(
      (e) => {
        if (!allowClick) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 3) {
          navigation.prev();
        } else {
          navigation.next();
        }
      },
      [allowClick, navigation]
    );
    (0, import_react.useEffect)(() => {
      if (autoplay === null || isPaused) return;
      const interval = setInterval(() => {
        navigation.next();
      }, autoplay);
      return () => clearInterval(interval);
    }, [autoplay, isPaused, navigation]);
    const toggleFullscreen = (0, import_react.useCallback)(() => {
      if (!containerRef.current) return;
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }, []);
    const exitFullscreen = (0, import_react.useCallback)(() => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }, []);
    (0, import_react.useImperativeHandle)(
      ref,
      () => ({
        next: navigation.next,
        prev: navigation.prev,
        goToSlide: navigation.goToSlide,
        getState: () => ({
          slide: state.currentSlide,
          fragment: state.currentFragment
        }),
        pause: () => setIsPaused(true),
        play: () => setIsPaused(false),
        toggleFullscreen
      }),
      [navigation, state, toggleFullscreen]
    );
    const contextValue = (0, import_react.useMemo)(
      () => ({ config, state, navigation }),
      [config, state, navigation]
    );
    const [scale, setScale] = (0, import_react.useState)(1);
    (0, import_react.useEffect)(() => {
      const updateScale = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scaleX = container.clientWidth / compositionWidth;
        const scaleY = container.clientHeight / compositionHeight;
        setScale(Math.min(scaleX, scaleY));
      };
      updateScale();
      window.addEventListener("resize", updateScale);
      return () => window.removeEventListener("resize", updateScale);
    }, [compositionWidth, compositionHeight]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: containerRef,
        className,
        style: {
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          overflow: "hidden",
          cursor: allowClick ? "pointer" : "default",
          ...style
        },
        onClick: handleClick,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                width: compositionWidth,
                height: compositionHeight,
                transform: `translate(-50%, -50%) scale(${scale})`,
                transformOrigin: "center center"
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.PresentationContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...inputProps }) })
            }
          ),
          controls && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              style: {
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: 8,
                color: "#fff",
                fontSize: 14,
                userSelect: "none"
              },
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: navigation.prev,
                    style: {
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      padding: 4
                    },
                    children: "\u25C0"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                  state.currentSlide + 1,
                  " / ",
                  slideCount
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: navigation.next,
                    style: {
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      padding: 4
                    },
                    children: "\u25B6"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: toggleFullscreen,
                    style: {
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      padding: 4,
                      marginLeft: 8
                    },
                    children: "\u26F6"
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
);
Player.displayName = "Player";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Player
});
