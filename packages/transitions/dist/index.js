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
  TransitionDeck: () => TransitionDeck,
  easedTiming: () => easedTiming,
  fade: () => fade,
  flip: () => flip,
  linearTiming: () => linearTiming,
  slide: () => slide,
  springTiming: () => springTiming,
  wipe: () => wipe
});
module.exports = __toCommonJS(index_exports);

// src/timing.ts
function linearTiming(options) {
  const { durationMs } = options;
  return {
    getDurationMs: () => durationMs,
    getProgress: (elapsed) => Math.min(elapsed / durationMs, 1)
  };
}
function springTiming(options) {
  const { config = {}, durationMs = 400 } = options;
  const { damping = 20, stiffness = 100, mass = 1 } = config;
  return {
    getDurationMs: () => durationMs,
    getProgress: (elapsed) => {
      const t = elapsed / durationMs;
      if (t >= 1) return 1;
      const omega0 = Math.sqrt(stiffness / mass);
      const zeta = damping / (2 * Math.sqrt(stiffness * mass));
      if (zeta >= 1) {
        return 1 - Math.exp(-zeta * omega0 * t * 4) * (1 + zeta * omega0 * t * 4);
      }
      const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
      const envelope = Math.exp(-zeta * omega0 * t * 4);
      return 1 - envelope * Math.cos(omegaD * t * 4);
    }
  };
}
function easedTiming(options) {
  const { durationMs, easing = "ease-in-out" } = options;
  const easingFunctions = {
    "linear": (t) => t,
    "ease": (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    "ease-in": (t) => t * t,
    "ease-out": (t) => 1 - (1 - t) * (1 - t),
    "ease-in-out": (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  };
  const easingFn = easingFunctions[easing] || easingFunctions["ease-in-out"];
  return {
    getDurationMs: () => durationMs,
    getProgress: (elapsed) => easingFn(Math.min(elapsed / durationMs, 1))
  };
}

// src/TransitionDeck.tsx
var import_react = require("react");
var import_core = require("@presotion/core");
var import_jsx_runtime = require("react/jsx-runtime");
function TransitionDeckSlide({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
TransitionDeckSlide.displayName = "TransitionDeck.Slide";
function TransitionDeckTransition(_props) {
  return null;
}
TransitionDeckTransition.displayName = "TransitionDeck.Transition";
var TransitionDeckBase = ({ children }) => {
  const { state } = (0, import_core.usePresentationContext)();
  const { currentSlide } = state;
  const prevSlideRef = (0, import_react.useRef)(currentSlide);
  const [isTransitioning, setIsTransitioning] = (0, import_react.useState)(false);
  const [transitionProgress, setTransitionProgress] = (0, import_react.useState)(0);
  const { slides, transitions } = (0, import_react.useMemo)(() => {
    const slidesList = [];
    const transitionsList = [];
    let slideIndex = 0;
    import_react.Children.forEach(children, (child) => {
      if (!(0, import_react.isValidElement)(child)) return;
      if (child.type === TransitionDeckSlide) {
        slidesList.push({ element: child, index: slideIndex });
        slideIndex++;
      } else if (child.type === TransitionDeckTransition) {
        const props = child.props;
        transitionsList.push({
          presentation: props.presentation,
          timing: props.timing ?? linearTiming({ durationMs: 300 }),
          afterSlideIndex: slideIndex - 1
        });
      }
    });
    return { slides: slidesList, transitions: transitionsList };
  }, [children]);
  (0, import_react.useEffect)(() => {
    if (currentSlide === prevSlideRef.current) return;
    const prevSlide = prevSlideRef.current;
    const transitionDef = transitions.find(
      (t) => t.afterSlideIndex === Math.min(prevSlide, currentSlide)
    );
    if (transitionDef) {
      setIsTransitioning(true);
      setTransitionProgress(0);
      const duration = transitionDef.timing.getDurationMs();
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = transitionDef.timing.getProgress(elapsed);
        setTransitionProgress(progress);
        if (elapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          setIsTransitioning(false);
          setTransitionProgress(1);
        }
      };
      requestAnimationFrame(animate);
    }
    prevSlideRef.current = currentSlide;
  }, [currentSlide, transitions]);
  const currentSlideData = slides.find((s) => s.index === currentSlide);
  const prevSlideData = slides.find((s) => s.index === prevSlideRef.current);
  const activeTransition = transitions.find(
    (t) => t.afterSlideIndex === Math.min(prevSlideRef.current, currentSlide)
  );
  if (!currentSlideData) {
    return null;
  }
  const isGoingForward = currentSlide > prevSlideRef.current;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_core.AbsoluteFill, { children: [
    isTransitioning && prevSlideData && activeTransition && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_core.AbsoluteFill,
      {
        style: {
          ...activeTransition.presentation.exit(transitionProgress),
          zIndex: isGoingForward ? 1 : 2
        },
        children: prevSlideData.element.props.children
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_core.AbsoluteFill,
      {
        style: {
          ...isTransitioning && activeTransition ? activeTransition.presentation.enter(transitionProgress) : {},
          zIndex: isGoingForward ? 2 : 1
        },
        children: currentSlideData.element.props.children
      }
    )
  ] });
};
var TransitionDeck = TransitionDeckBase;
TransitionDeck.Slide = TransitionDeckSlide;
TransitionDeck.Transition = TransitionDeckTransition;

// src/fade.ts
function fade(options = {}) {
  const { enterFrom = 0, exitTo = 0 } = options;
  return {
    enter: (progress) => ({
      opacity: enterFrom + (1 - enterFrom) * progress
    }),
    exit: (progress) => ({
      opacity: 1 - (1 - exitTo) * progress
    })
  };
}

// src/slide.ts
function slide(options = {}) {
  const { direction = "from-right" } = options;
  const getTransform = (progress, isEnter) => {
    const offset = isEnter ? 1 - progress : progress;
    switch (direction) {
      case "from-left":
        return `translateX(${isEnter ? -offset * 100 : offset * 100}%)`;
      case "from-right":
        return `translateX(${isEnter ? offset * 100 : -offset * 100}%)`;
      case "from-top":
        return `translateY(${isEnter ? -offset * 100 : offset * 100}%)`;
      case "from-bottom":
        return `translateY(${isEnter ? offset * 100 : -offset * 100}%)`;
      default:
        return `translateX(${isEnter ? offset * 100 : -offset * 100}%)`;
    }
  };
  return {
    enter: (progress) => ({
      transform: getTransform(progress, true)
    }),
    exit: (progress) => ({
      transform: getTransform(progress, false)
    })
  };
}

// src/wipe.ts
function wipe(options = {}) {
  const { direction = "left" } = options;
  const getClipPath = (progress, isEnter) => {
    const p = isEnter ? progress : 1 - progress;
    switch (direction) {
      case "left":
        return `inset(0 ${(1 - p) * 100}% 0 0)`;
      case "right":
        return `inset(0 0 0 ${(1 - p) * 100}%)`;
      case "up":
        return `inset(0 0 ${(1 - p) * 100}% 0)`;
      case "down":
        return `inset(${(1 - p) * 100}% 0 0 0)`;
      default:
        return `inset(0 ${(1 - p) * 100}% 0 0)`;
    }
  };
  return {
    enter: (progress) => ({
      clipPath: getClipPath(progress, true)
    }),
    exit: (progress) => ({
      clipPath: getClipPath(progress, false)
    })
  };
}

// src/flip.ts
function flip(options = {}) {
  const { direction = "horizontal", perspective = 1e3 } = options;
  const axis = direction === "horizontal" ? "Y" : "X";
  return {
    enter: (progress) => ({
      transform: `perspective(${perspective}px) rotate${axis}(${(1 - progress) * -90}deg)`,
      backfaceVisibility: "hidden"
    }),
    exit: (progress) => ({
      transform: `perspective(${perspective}px) rotate${axis}(${progress * 90}deg)`,
      backfaceVisibility: "hidden"
    })
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TransitionDeck,
  easedTiming,
  fade,
  flip,
  linearTiming,
  slide,
  springTiming,
  wipe
});
