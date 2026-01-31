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

export {
  wipe
};
