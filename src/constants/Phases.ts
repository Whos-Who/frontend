export const Phase = {
  LOBBY: "LOBBY" as const,
  QUESTION: "QUESTION" as const,
  TURN_GUESS: "TURN_GUESS" as const,
  TURN_REVEAL: "TURN_REVEAL" as const,
  SCOREBOARD: "SCOREBOARD" as const,
};

export type Phase = typeof Phase[keyof typeof Phase];
