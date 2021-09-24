declare namespace Sockets {
  interface UserJoinResponse {
    clientId: string;
    gameState: GameState;
  }

  interface UserLeaveResponse {
    clientId: string;
    gameState: GameState;
  }

  type NewHostResponse = string;

  type RoomJoinResponse = GameState;

  type GamePhaseQuestionResponse = GameState;

  type GamePhaseTurnGuessResponse = GameState;

  type GamePhaseTurnRevealResponse = GameState;

  interface GamePlayerReadyResponse {
    readyClientId: string;
    gameState: GameState;
  }

  interface PlayerDisconnectedResponse {
    clientId: string;
    gameState: GameState;
  }

  interface PlayerReconnectedResponse {
    clientId: string;
    gameState: GameState;
  }
}
