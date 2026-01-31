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

// src/slide.ts
var slide_exports = {};
__export(slide_exports, {
  slide: () => slide
});
module.exports = __toCommonJS(slide_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  slide
});
