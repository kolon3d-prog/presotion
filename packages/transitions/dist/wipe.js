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

// src/wipe.ts
var wipe_exports = {};
__export(wipe_exports, {
  wipe: () => wipe
});
module.exports = __toCommonJS(wipe_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wipe
});
