export const Promotion = {
  Actual: 0,
  Other: 1,
} as const;

export type Promotion = (typeof Promotion)[keyof typeof Promotion];
