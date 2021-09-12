declare namespace App {
  enum Phase {
    LOBBY,
    QUESTION,
    TURN_GUESS,
    TURN_REVEAL,
    SCOREBOARD,
  }

  interface PlayerState {
    username: string;
    isConnected: boolean;
    score: number;
    currAnswer: string | null;
    isGuessed: boolean | null;
  }

  interface GameState {
    roomCode: string;
    phase: Phase;
    hostId: string;
    currQuestion: string | null;
    currAnswererId: string | null;
    playerCount: number;
    players: Record<string, PlayerState>;
  }
}
