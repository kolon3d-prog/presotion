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

// src/fade.ts
var fade_exports = {};
__export(fade_exports, {
  fade: () => fade
});
module.exports = __toCommonJS(fade_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fade
});
