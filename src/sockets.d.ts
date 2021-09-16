declare namespace Sockets {
  interface UserJoinResponse {
    clientId: string;
    gameState: GameState;
  }

  interface UserLeaveResponse {
    clientId: string;
    gameState: GameState;
  }

  type RoomJoinResponse = GameState;
}
