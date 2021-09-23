import { Dispatch, useEffect } from "react";
import { AnyAction } from "redux";

import SocketContext from "../contexts/SocketContext";
import { setGameState, setHost } from "../redux/gameStateSlice";

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
      dispatch(setGameState(response));
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
      dispatch(setGameState(response));
    };

    socketContext?.socket?.on("player-reconnect", playerReconnectedListener);

    return () => {
      socketContext?.socket?.off("player-reconnect", playerReconnectedListener);
    };
  }, [socketContext?.socket]);
};
