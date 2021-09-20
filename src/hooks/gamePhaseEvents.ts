import { Dispatch, useEffect } from "react";
import { AnyAction } from "redux";

import SocketContext from "../contexts/SocketContext";
import { setGameState } from "../redux/gameStateSlice";

export const useGameNextPhase = (
  dispatch: Dispatch<AnyAction>,
  socketContext: SocketContext | undefined
): void => {
  useEffect(() => {
    const gameNextPhaseListener = (
      response: Sockets.GamePhaseQuestionResponse
    ) => {
      dispatch(setGameState(response));
    };

    socketContext?.socket?.on("game-next-phase", gameNextPhaseListener);

    return () => {
      socketContext?.socket?.off("game-next-phase", gameNextPhaseListener);
    };
  }, [socketContext?.socket]);
};
