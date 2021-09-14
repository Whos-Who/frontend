import React from "react";
import { Socket } from "socket.io-client";

interface SocketContext {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

const SocketContext = React.createContext<SocketContext | undefined>(undefined);

export default SocketContext;
