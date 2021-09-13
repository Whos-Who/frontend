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
    // hostId: string;
    // currQuestion: string | null;
    // currAnswererId: string | null;
    // playerCount: number;
    // questionsLeft: number;
    // selectedPlayerId: string;
    // selectedAnswer: string;
    // players: Record<string, PlayerState>;
  }
}
