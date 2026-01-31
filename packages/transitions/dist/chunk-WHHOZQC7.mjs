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

export {
  slide
};
