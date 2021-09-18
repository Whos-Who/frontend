import { Dispatch, useEffect } from "react";
import { AnyAction } from "redux";

import SocketContext from "../contexts/SocketContext";
import { setGameState } from "../redux/gameStateSlice";

// Listens for the event where the host changes
export const useGamePhaseQuestion = (
  dispatch: Dispatch<AnyAction>,
  socketContext: SocketContext | undefined
): void => {
  useEffect(() => {
    const gamePhaseQuestionListener = (
      response: Sockets.GamePhaseQuestionResponse
    ) => {
      dispatch(setGameState(response));
    };

    socketContext?.socket?.on("game-phase-question", gamePhaseQuestionListener);

    return () => {
      socketContext?.socket?.off(
        "game-phase-question",
        gamePhaseQuestionListener
      );
    };
  }, [socketContext?.socket]);
};
