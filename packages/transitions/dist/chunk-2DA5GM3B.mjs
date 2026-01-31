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

export {
  flip
};
