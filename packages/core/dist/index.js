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
  AbsoluteFill: () => AbsoluteFill,
  Deck: () => Deck,
  Easing: () => Easing,
  Fragment: () => Fragment4,
  FragmentList: () => FragmentList,
  Img: () => Img,
  Presentation: () => Presentation,
  PresentationContext: () => PresentationContext,
  Slide: () => Slide,
  SpringConfigs: () => SpringConfigs,
  getSpringDuration: () => getSpringDuration,
  interpolate: () => interpolate,
  interpolateFragment: () => interpolateFragment,
  spring: () => spring,
  staticFile: () => staticFile,
  useCurrentSlide: () => useCurrentSlide,
  useFragment: () => useFragment,
  useFragmentCount: () => useFragmentCount,
  useNavigation: () => useNavigation,
  usePresentationConfig: () => usePresentationConfig,
  usePresentationContext: () => usePresentationContext,
  useProgress: () => useProgress
});
module.exports = __toCommonJS(index_exports);

// src/components/AbsoluteFill.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var absoluteFillStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column"
};
var AbsoluteFill = (0, import_react.forwardRef)(
  ({ children, style, className }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className,
        style: {
          ...absoluteFillStyle,
          ...style
        },
        children
      }
    );
  }
);
AbsoluteFill.displayName = "AbsoluteFill";

// src/components/Slide.tsx
var import_react4 = require("react");

// src/internals/slide-context.ts
var import_react2 = require("react");
var SlideContext = (0, import_react2.createContext)(null);
function useSlideContext() {
  return (0, import_react2.useContext)(SlideContext);
}

// src/internals/context.ts
var import_react3 = require("react");
var PresentationContext = (0, import_react3.createContext)(null);
function usePresentationContext() {
  const context = (0, import_react3.useContext)(PresentationContext);
  if (!context) {
    throw new Error(
      "usePresentationContext must be used within a PresentationProvider. Make sure your component is wrapped in a <Presentation> or <Player> component."
    );
  }
  return context;
}

// src/components/Slide.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Slide({
  from,
  fragmentCount = 1,
  children,
  layout = "default",
  name,
  className,
  style
}) {
  const { state } = usePresentationContext();
  const { currentSlide, currentFragment } = state;
  const isVisible = currentSlide === from;
  const localFragment = isVisible ? currentFragment : 0;
  const contextValue = (0, import_react4.useMemo)(
    () => ({
      slideIndex: from,
      fragmentCount,
      currentFragment: localFragment,
      layout
    }),
    [from, fragmentCount, localFragment, layout]
  );
  if (!isVisible) {
    return null;
  }
  const content = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SlideContext.Provider, { value: contextValue, children });
  if (layout === "none") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: content });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AbsoluteFill, { className, style, "data-slide": from, "data-slide-name": name, children: content });
}

// src/components/Deck.tsx
var import_react5 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function DeckSlide({
  fragmentCount = 1,
  children,
  name,
  className,
  style
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children });
}
DeckSlide.displayName = "Deck.Slide";
var DeckBase = ({ children, startFrom = 0 }) => {
  const { state } = usePresentationContext();
  const { currentSlide, currentFragment } = state;
  const slides = (0, import_react5.useMemo)(() => {
    const result = [];
    let slideIndex2 = startFrom;
    import_react5.Children.forEach(children, (child) => {
      if ((0, import_react5.isValidElement)(child) && child.type === DeckSlide) {
        result.push({
          element: child,
          slideIndex: slideIndex2,
          fragmentCount: child.props.fragmentCount ?? 1
        });
        slideIndex2++;
      }
    });
    return result;
  }, [children, startFrom]);
  const currentSlideData = slides.find((s) => s.slideIndex === currentSlide);
  if (!currentSlideData) {
    return null;
  }
  const { element, slideIndex, fragmentCount } = currentSlideData;
  const props = element.props;
  const contextValue = (0, import_react5.useMemo)(
    () => ({
      slideIndex,
      fragmentCount,
      currentFragment,
      layout: "default"
    }),
    [slideIndex, fragmentCount, currentFragment]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    AbsoluteFill,
    {
      className: props.className,
      style: props.style,
      "data-slide": slideIndex,
      "data-slide-name": props.name,
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SlideContext.Provider, { value: contextValue, children: props.children })
    }
  );
};
var Deck = DeckBase;
Deck.Slide = DeckSlide;

// src/components/Fragment.tsx
var import_react6 = require("react");

// src/hooks/useFragment.ts
function useFragment() {
  const slideContext = useSlideContext();
  const { state } = usePresentationContext();
  if (slideContext) {
    return slideContext.currentFragment;
  }
  return state.currentFragment;
}
function useFragmentCount() {
  const slideContext = useSlideContext();
  if (slideContext) {
    return slideContext.fragmentCount;
  }
  return 1;
}

// src/spring.ts
var SpringConfigs = {
  /** Smooth motion without bounce - good for subtle reveals */
  smooth: { damping: 200 },
  /** Snappy motion with minimal bounce - good for UI elements */
  snappy: { damping: 20, stiffness: 200 },
  /** Bouncy entrance - good for playful animations */
  bouncy: { damping: 8 },
  /** Heavy, slow motion with small bounce */
  heavy: { damping: 15, stiffness: 80, mass: 2 },
  /** Default spring configuration */
  default: { mass: 1, damping: 10, stiffness: 100 }
};
function spring(options) {
  const {
    fragment,
    delay = 0,
    durationInFragments,
    config = SpringConfigs.default,
    from = 0,
    to = 1
  } = options;
  const { mass = 1, damping = 10, stiffness = 100 } = config;
  const adjustedFragment = fragment - delay;
  if (adjustedFragment < 0) {
    return from;
  }
  if (durationInFragments !== void 0 && durationInFragments > 0) {
    const progress = Math.min(adjustedFragment / durationInFragments, 1);
    return from + (to - from) * springEasing(progress, mass, damping, stiffness);
  }
  const springProgress = calculateSpringProgress(adjustedFragment, mass, damping, stiffness);
  return from + (to - from) * Math.min(springProgress, 1);
}
function calculateSpringProgress(fragment, mass, damping, stiffness) {
  const t = fragment * 0.5;
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  if (zeta < 1) {
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    const envelope = Math.exp(-zeta * omega0 * t);
    return 1 - envelope * (Math.cos(omegaD * t) + zeta * omega0 / omegaD * Math.sin(omegaD * t));
  } else if (zeta === 1) {
    return 1 - (1 + omega0 * t) * Math.exp(-omega0 * t);
  } else {
    const s1 = -omega0 * (zeta - Math.sqrt(zeta * zeta - 1));
    const s2 = -omega0 * (zeta + Math.sqrt(zeta * zeta - 1));
    return 1 - (s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s2 - s1);
  }
}
function springEasing(progress, mass, damping, stiffness) {
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const t = progress * 4;
  if (zeta >= 1) {
    return 1 - Math.exp(-zeta * omega0 * t) * (1 + zeta * omega0 * t);
  }
  const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
  const envelope = Math.exp(-zeta * omega0 * t);
  return 1 - envelope * Math.cos(omegaD * t);
}
function getSpringDuration(config = SpringConfigs.default) {
  const { mass = 1, damping = 10, stiffness = 100 } = config;
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const settleTime = -Math.log(1e-3) / (zeta * omega0);
  return Math.ceil(settleTime / 0.5);
}

// src/components/Fragment.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function Fragment4({
  at = 0,
  children,
  animation = "fade",
  springConfig = SpringConfigs.smooth
}) {
  const currentFragment = useFragment();
  const isVisible = currentFragment >= at;
  const progress = isVisible ? spring({
    fragment: currentFragment - at,
    config: springConfig
  }) : 0;
  if (animation === "none") {
    return isVisible ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children }) : null;
  }
  let animationStyle = {};
  switch (animation) {
    case "fade":
      animationStyle = { opacity: progress };
      break;
    case "slide-up":
      animationStyle = {
        opacity: progress,
        transform: `translateY(${(1 - progress) * 20}px)`
      };
      break;
    case "slide-down":
      animationStyle = {
        opacity: progress,
        transform: `translateY(${(1 - progress) * -20}px)`
      };
      break;
    case "slide-left":
      animationStyle = {
        opacity: progress,
        transform: `translateX(${(1 - progress) * 20}px)`
      };
      break;
    case "slide-right":
      animationStyle = {
        opacity: progress,
        transform: `translateX(${(1 - progress) * -20}px)`
      };
      break;
    case "scale":
      animationStyle = {
        opacity: progress,
        transform: `scale(${0.9 + progress * 0.1})`
      };
      break;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { ...animationStyle, willChange: "opacity, transform" }, children });
}
function FragmentList({
  children,
  startAt = 0,
  animation = "fade",
  springConfig
}) {
  const childArray = import_react6.Children.toArray(children);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: childArray.map((child, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    Fragment4,
    {
      at: startAt + index,
      animation,
      springConfig,
      children: child
    },
    index
  )) });
}

// src/components/Presentation.tsx
var import_react7 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function Presentation({
  id,
  component: Component,
  width = 1920,
  height = 1080,
  slideCount,
  defaultProps = {},
  schema,
  calculateMetadata
}) {
  const [fragmentCounts, setFragmentCounts] = (0, import_react7.useState)([]);
  const [state, setState] = (0, import_react7.useState)({
    currentSlide: 0,
    currentFragment: 0,
    isPresenterMode: false
  });
  const [resolvedProps, setResolvedProps] = (0, import_react7.useState)(defaultProps);
  const [resolvedMetadata, setResolvedMetadata] = (0, import_react7.useState)({
    slideCount,
    width,
    height
  });
  (0, import_react7.useEffect)(() => {
    if (!calculateMetadata) return;
    const controller = new AbortController();
    calculateMetadata({
      props: defaultProps,
      abortSignal: controller.signal
    }).then((result) => {
      if (controller.signal.aborted) return;
      setResolvedMetadata((prev) => ({
        slideCount: result.slideCount ?? prev.slideCount,
        width: result.width ?? prev.width,
        height: result.height ?? prev.height
      }));
      if (result.props) {
        setResolvedProps(result.props);
      }
    }).catch((err) => {
      if (err.name !== "AbortError") {
        console.error("calculateMetadata failed:", err);
      }
    });
    return () => controller.abort();
  }, [calculateMetadata, defaultProps]);
  const config = (0, import_react7.useMemo)(
    () => ({
      id,
      width: resolvedMetadata.width,
      height: resolvedMetadata.height,
      slideCount: resolvedMetadata.slideCount
    }),
    [id, resolvedMetadata]
  );
  const navigation = (0, import_react7.useMemo)(
    () => ({
      next: () => {
        setState((prev) => {
          const currentFragmentCount = fragmentCounts[prev.currentSlide] ?? 1;
          if (prev.currentFragment < currentFragmentCount - 1) {
            return { ...prev, currentFragment: prev.currentFragment + 1 };
          }
          if (prev.currentSlide < resolvedMetadata.slideCount - 1) {
            return { ...prev, currentSlide: prev.currentSlide + 1, currentFragment: 0 };
          }
          return prev;
        });
      },
      prev: () => {
        setState((prev) => {
          if (prev.currentFragment > 0) {
            return { ...prev, currentFragment: prev.currentFragment - 1 };
          }
          if (prev.currentSlide > 0) {
            const prevSlideFragmentCount = fragmentCounts[prev.currentSlide - 1] ?? 1;
            return {
              ...prev,
              currentSlide: prev.currentSlide - 1,
              currentFragment: prevSlideFragmentCount - 1
            };
          }
          return prev;
        });
      },
      goToSlide: (slideIndex, fragmentIndex = 0) => {
        if (slideIndex >= 0 && slideIndex < resolvedMetadata.slideCount) {
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
    [fragmentCounts, resolvedMetadata.slideCount]
  );
  const contextValue = (0, import_react7.useMemo)(
    () => ({ config, state, navigation }),
    [config, state, navigation]
  );
  const registerFragmentCount = (0, import_react7.useCallback)((slideIndex, count) => {
    setFragmentCounts((prev) => {
      const next = [...prev];
      next[slideIndex] = count;
      return next;
    });
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PresentationContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "div",
    {
      "data-presotion-presentation": id,
      style: {
        width: config.width,
        height: config.height,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Component, { ...resolvedProps })
    }
  ) });
}

// src/components/Img.tsx
var import_react8 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var Img = (0, import_react8.forwardRef)(
  ({ src, placeholder, style, ...props }, ref) => {
    const [loaded, setLoaded] = (0, import_react8.useState)(false);
    const [error, setError] = (0, import_react8.useState)(false);
    (0, import_react8.useEffect)(() => {
      setLoaded(false);
      setError(false);
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
      if (img.complete) {
        setLoaded(true);
      }
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }, [src]);
    if (error) {
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          style: {
            ...style,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
            color: "#666"
          },
          children: "Failed to load image"
        }
      );
    }
    if (!loaded && placeholder) {
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: placeholder });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "img",
      {
        ref,
        src,
        style: {
          ...style,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.2s"
        },
        ...props
      }
    );
  }
);
Img.displayName = "Img";

// src/hooks/useCurrentSlide.ts
function useCurrentSlide() {
  const { state } = usePresentationContext();
  return state.currentSlide;
}

// src/hooks/usePresentationConfig.ts
function usePresentationConfig() {
  const { config } = usePresentationContext();
  return config;
}

// src/hooks/useNavigation.ts
function useNavigation() {
  const { navigation } = usePresentationContext();
  return navigation;
}

// src/hooks/useProgress.ts
function useProgress() {
  const { config, state } = usePresentationContext();
  if (config.slideCount <= 1) {
    return state.currentSlide === 0 ? 0 : 1;
  }
  return state.currentSlide / (config.slideCount - 1);
}

// src/interpolate.ts
function interpolateFragment(fragment, inputRange, outputRange, options = {}) {
  const {
    extrapolateLeft = "extend",
    extrapolateRight = "extend",
    easing
  } = options;
  if (inputRange.length !== outputRange.length) {
    throw new Error("inputRange and outputRange must have the same length");
  }
  if (inputRange.length < 2) {
    throw new Error("inputRange must have at least 2 values");
  }
  for (let i = 1; i < inputRange.length; i++) {
    if (inputRange[i] < inputRange[i - 1]) {
      throw new Error("inputRange must be monotonically increasing");
    }
  }
  if (fragment < inputRange[0]) {
    switch (extrapolateLeft) {
      case "clamp":
        return outputRange[0];
      case "identity":
        return fragment;
      case "extend":
      default:
        break;
    }
  }
  if (fragment > inputRange[inputRange.length - 1]) {
    switch (extrapolateRight) {
      case "clamp":
        return outputRange[outputRange.length - 1];
      case "identity":
        return fragment;
      case "extend":
      default:
        break;
    }
  }
  let segmentIndex = 0;
  for (let i = 1; i < inputRange.length; i++) {
    if (fragment <= inputRange[i]) {
      segmentIndex = i - 1;
      break;
    }
    segmentIndex = i - 1;
  }
  const inputStart = inputRange[segmentIndex];
  const inputEnd = inputRange[segmentIndex + 1] ?? inputRange[segmentIndex];
  const outputStart = outputRange[segmentIndex];
  const outputEnd = outputRange[segmentIndex + 1] ?? outputRange[segmentIndex];
  let progress = inputEnd === inputStart ? 1 : (fragment - inputStart) / (inputEnd - inputStart);
  if (easing) {
    progress = easing(Math.max(0, Math.min(1, progress)));
  }
  return outputStart + progress * (outputEnd - outputStart);
}
var interpolate = interpolateFragment;

// src/easing.ts
var Easing = {
  /** Linear easing (no curve) */
  linear: (t) => t,
  /** Quadratic curve */
  quad: (t) => t * t,
  /** Cubic curve */
  cubic: (t) => t * t * t,
  /** Quartic curve */
  quart: (t) => t * t * t * t,
  /** Quintic curve */
  quint: (t) => t * t * t * t * t,
  /** Sinusoidal curve */
  sin: (t) => 1 - Math.cos(t * Math.PI / 2),
  /** Exponential curve */
  exp: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  /** Circular curve */
  circle: (t) => 1 - Math.sqrt(1 - t * t),
  /** Elastic curve with bounce effect */
  elastic: (t) => {
    const c4 = 2 * Math.PI / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },
  /** Back curve - overshoots then returns */
  back: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  /** Bounce curve */
  bounce: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    let x = 1 - t;
    if (x < 1 / d1) {
      return 1 - n1 * x * x;
    } else if (x < 2 / d1) {
      return 1 - (n1 * (x -= 1.5 / d1) * x + 0.75);
    } else if (x < 2.5 / d1) {
      return 1 - (n1 * (x -= 2.25 / d1) * x + 0.9375);
    } else {
      return 1 - (n1 * (x -= 2.625 / d1) * x + 0.984375);
    }
  },
  /**
   * Create an "in" easing (starts slow, ends fast)
   */
  in: (easing) => {
    return easing;
  },
  /**
   * Create an "out" easing (starts fast, ends slow)
   */
  out: (easing) => {
    return (t) => 1 - easing(1 - t);
  },
  /**
   * Create an "in-out" easing (slow start and end, fast middle)
   */
  inOut: (easing) => {
    return (t) => {
      if (t < 0.5) {
        return easing(t * 2) / 2;
      }
      return 1 - easing((1 - t) * 2) / 2;
    };
  },
  /**
   * Create a cubic bezier easing function.
   * 
   * @example
   * ```tsx
   * const easing = Easing.bezier(0.25, 0.1, 0.25, 1.0);
   * ```
   */
  bezier: (x1, y1, x2, y2) => {
    const sampleCurveX = (t) => ((1 - 3 * x2 + 3 * x1) * t + (3 * x2 - 6 * x1)) * t + 3 * x1 * t;
    const sampleCurveY = (t) => ((1 - 3 * y2 + 3 * y1) * t + (3 * y2 - 6 * y1)) * t + 3 * y1 * t;
    const sampleCurveDerivativeX = (t) => (3 - 9 * x2 + 9 * x1) * t * t + (6 * x2 - 12 * x1) * t + 3 * x1;
    const solveCurveX = (x) => {
      let t = x;
      for (let i = 0; i < 8; i++) {
        const error = sampleCurveX(t) - x;
        if (Math.abs(error) < 1e-6) {
          return t;
        }
        const derivative = sampleCurveDerivativeX(t);
        if (Math.abs(derivative) < 1e-6) {
          break;
        }
        t -= error / derivative;
      }
      return t;
    };
    return (x) => {
      if (x === 0 || x === 1) {
        return x;
      }
      return sampleCurveY(solveCurveX(x));
    };
  }
};

// src/staticFile.ts
function staticFile(path) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const encodedPath = cleanPath.split("/").map((segment) => encodeURIComponent(segment)).join("/");
  if (typeof window !== "undefined") {
    const base = window.location.origin;
    return `${base}/${encodedPath}`;
  }
  return `/${encodedPath}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AbsoluteFill,
  Deck,
  Easing,
  Fragment,
  FragmentList,
  Img,
  Presentation,
  PresentationContext,
  Slide,
  SpringConfigs,
  getSpringDuration,
  interpolate,
  interpolateFragment,
  spring,
  staticFile,
  useCurrentSlide,
  useFragment,
  useFragmentCount,
  useNavigation,
  usePresentationConfig,
  usePresentationContext,
  useProgress
});
