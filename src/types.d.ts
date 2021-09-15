import { Phase } from "./constants/Phases";

declare global {
  interface PlayerState {
    username: string;
    isConnected: boolean;
    score: number;
    currAnswer: {
      isGuessed: boolean;
      value: string;
    } | null;
  }

  interface GameState {
    roomCode: string | null;
    phase: Phase | null;
    host: string;
    currQuestion: string;
    currAnswerer: string;
    playerCount: number;
    questionsLeft: number;
    selectedPlayerId: string;
    selectedAnswer: string;
    players: Record<string, PlayerState>;
  }
}
