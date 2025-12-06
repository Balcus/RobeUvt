export const CapSize = {
  S: 0,
  M: 1,
  L: 2,
  XL: 3,
} as const;

export type CapSize = (typeof CapSize)[keyof typeof CapSize];
