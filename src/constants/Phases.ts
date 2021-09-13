export const Phase = {
  LOBBY: "lobby" as const,
  QUESTION: "queston" as const,
  TURN_GUESS: "turn_guess" as const,
  TURN_REVEAL: "turn_reveal" as const,
  SCOREBOARD: "scoreboard" as const,
};

export type Phase = typeof Phase[keyof typeof Phase];
