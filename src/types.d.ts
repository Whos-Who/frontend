import { Phase } from "./constants/Phases";

declare global {
  interface PlayerState {
    username: string;
    isConnected: boolean;
    score: number;
    currAnswer: {
      isGuessed: boolean;
      value: string;
    };
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

  interface Deck {
    id: string;
    title: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    Questions: Question[];
  }

  interface Question {
    id: string;
    question: string;
    deckId: string;
    createdAt: string;
    updatedAt: string;
  }
}
