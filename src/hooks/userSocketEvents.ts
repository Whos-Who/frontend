import { nanoid } from "nanoid";
import { Dispatch, useEffect } from "react";
import { AnyAction } from "redux";

import { SnackBarType } from "../constants/types";
import SocketContext from "../contexts/SocketContext";
import { setGameState, setHost } from "../redux/gameStateSlice";
import { addSnackBar } from "../redux/snackBarsSlice";

// Listens for the event where the host changes
export const useNewHost = (
  dispatch: Dispatch<AnyAction>,
  socketContext: SocketContext | undefined
): void => {
  useEffect(() => {
    const newHostListener = (response: Sockets.NewHostResponse) => {
      dispatch(setHost({ host: response }));
    };

    socketContext?.socket?.on("new-host", newHostListener);

    return () => {
      socketContext?.socket?.off("new-host", newHostListener);
    };
  }, [socketContext?.socket]);
};

export const usePlayerDisconnected = (
  dispatch: Dispatch<AnyAction>,
  socketContext: SocketContext | undefined
): void => {
  useEffect(() => {
    const playerDisconnectedListener = (
      response: Sockets.PlayerDisconnectedResponse
    ) => {
      dispatch(
        addSnackBar({
          id: nanoid(),
          message: " disconnected",
          clientId: response.clientId,
          type: SnackBarType.Negative,
        })
      );
      dispatch(setGameState(response.gameState));
    };

    socketContext?.socket?.on("player-disconnect", playerDisconnectedListener);

    return () => {
      socketContext?.socket?.off(
        "player-disconnect",
        playerDisconnectedListener
      );
    };
  }, [socketContext?.socket]);
};

export const usePlayerReconnected = (
  dispatch: Dispatch<AnyAction>,
  socketContext: SocketContext | undefined
): void => {
  useEffect(() => {
    const playerReconnectedListener = (
      response: Sockets.PlayerReconnectedResponse
    ) => {
      dispatch(
        addSnackBar({
          id: nanoid(),
          message: " reconnected",
          clientId: response.clientId,
          type: SnackBarType.Positive,
        })
      );
      dispatch(setGameState(response.gameState));
    };

    socketContext?.socket?.on("player-reconnect", playerReconnectedListener);

    return () => {
      socketContext?.socket?.off("player-reconnect", playerReconnectedListener);
    };
  }, [socketContext?.socket]);
};
