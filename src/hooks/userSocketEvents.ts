import { Dispatch, useEffect } from "react";
import { AnyAction } from "redux";

import SocketContext from "../contexts/SocketContext";
import { setHost } from "../redux/gameStateSlice";

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
