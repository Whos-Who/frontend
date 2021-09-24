export const SnackBarType = {
  Default: "default" as const,
  Positive: "positive" as const,
  Negative: "negative" as const,
};

export type SnackBarTypeValues = typeof SnackBarType[keyof typeof SnackBarType];
