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

// src/flip.ts
var flip_exports = {};
__export(flip_exports, {
  flip: () => flip
});
module.exports = __toCommonJS(flip_exports);
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
  flip
});
