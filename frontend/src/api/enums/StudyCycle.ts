export const StudyCycle = {
  Bachelor: 0,
  Master: 1,
} as const;

export type StudyCycle = (typeof StudyCycle)[keyof typeof StudyCycle];
