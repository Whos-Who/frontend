import { Dispatch, useEffect } from "react";
import { AnyAction } from "redux";

import SocketContext from "../contexts/SocketContext";
import { setGameState } from "../redux/gameStateSlice";

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

export const useGamePhaseTurnGuess = (
  dispatch: Dispatch<AnyAction>,
  socketContext: SocketContext | undefined
): void => {
  useEffect(() => {
    const gamePhaseTurnGuessListener = (
      response: Sockets.GamePhaseQuestionResponse
    ) => {
      dispatch(setGameState(response));
    };

    socketContext?.socket?.on(
      "game-phase-turn-guess",
      gamePhaseTurnGuessListener
    );

    return () => {
      socketContext?.socket?.off(
        "game-phase-turn-guess",
        gamePhaseTurnGuessListener
      );
    };
  }, [socketContext?.socket]);
};
