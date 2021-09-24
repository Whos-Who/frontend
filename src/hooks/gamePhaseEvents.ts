import { Dispatch, useEffect } from "react";
import { AnyAction } from "redux";

import SocketContext from "../contexts/SocketContext";
import { setGameState } from "../redux/gameStateSlice";
import { setAlreadyGuessed } from "../redux/validitySlice";

export const useGameNextPhase = (
  dispatch: Dispatch<AnyAction>,
  socketContext: SocketContext | undefined
): void => {
  useEffect(() => {
    const gameNextPhaseListener = (response: Sockets.GameNextPhaseResponse) => {
      dispatch(setGameState(response.gameState));

      if (response.alreadyGuessed != null) {
        dispatch(
          setAlreadyGuessed({
            alreadyGuessed: response.alreadyGuessed,
          })
        );
      }
    };

    socketContext?.socket?.on("game-next-phase", gameNextPhaseListener);

    return () => {
      socketContext?.socket?.off("game-next-phase", gameNextPhaseListener);
    };
  }, [socketContext?.socket]);
};
