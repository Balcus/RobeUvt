export const Role = {
  Student: 0,
  Administrator: 1,
  Owner: 2,
} as const;

export type Role = (typeof Role)[keyof typeof Role];
