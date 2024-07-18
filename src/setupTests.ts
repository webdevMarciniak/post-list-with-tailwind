import "@testing-library/jest-dom/extend-expect";
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
