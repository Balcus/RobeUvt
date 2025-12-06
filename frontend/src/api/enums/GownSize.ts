export const GownSize = {
  _4XS: 0,
  _3XS: 1,
  XXS: 2,
  XS: 3,
  S: 4,
  M: 5,
  L: 6,
  XL: 7,
  XXL: 8,
  _3XL: 9,
  _4XL: 10,
  _5XL: 11,
} as const;

export type GownSize = (typeof GownSize)[keyof typeof GownSize];
