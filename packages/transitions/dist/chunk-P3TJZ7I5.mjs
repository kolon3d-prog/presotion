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

export {
  fade
};
