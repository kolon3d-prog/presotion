import {
  fade
} from "./chunk-P3TJZ7I5.mjs";
import {
  flip
} from "./chunk-2DA5GM3B.mjs";
import {
  slide
} from "./chunk-WHHOZQC7.mjs";
import {
  wipe
} from "./chunk-VWMLNA2O.mjs";

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
import { Children, isValidElement, useMemo, useState, useEffect, useRef } from "react";
import { usePresentationContext, AbsoluteFill } from "@presotion/core";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function TransitionDeckSlide({ children }) {
  return /* @__PURE__ */ jsx(Fragment, { children });
}
TransitionDeckSlide.displayName = "TransitionDeck.Slide";
function TransitionDeckTransition(_props) {
  return null;
}
TransitionDeckTransition.displayName = "TransitionDeck.Transition";
var TransitionDeckBase = ({ children }) => {
  const { state } = usePresentationContext();
  const { currentSlide } = state;
  const prevSlideRef = useRef(currentSlide);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const { slides, transitions } = useMemo(() => {
    const slidesList = [];
    const transitionsList = [];
    let slideIndex = 0;
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
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
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(AbsoluteFill, { children: [
    isTransitioning && prevSlideData && activeTransition && /* @__PURE__ */ jsx(
      AbsoluteFill,
      {
        style: {
          ...activeTransition.presentation.exit(transitionProgress),
          zIndex: isGoingForward ? 1 : 2
        },
        children: prevSlideData.element.props.children
      }
    ),
    /* @__PURE__ */ jsx(
      AbsoluteFill,
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
export {
  TransitionDeck,
  easedTiming,
  fade,
  flip,
  linearTiming,
  slide,
  springTiming,
  wipe
};
