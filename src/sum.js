export const sum = (a, b) => {
  return a + b;
};

export const message = (a) => {
  if (a > 1000) {
    return "값이 너무 큽니다.";
  }
};

export const thousand = (a) => {
  if (a > 1000) {
    return 1000;
  }
};
