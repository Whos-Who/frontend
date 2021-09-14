import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { io, Socket } from "socket.io-client";

import Phase from "../components/Phase";
import SocketContext from "../contexts/SocketContext";
import { useTrackPage } from "../hooks/GoogleAnalytics";
import { selectPhase } from "../redux/gameStateSlice";
import { useAppSelector } from "../redux/hooks";

const Room: React.FC = function () {
  const history = useHistory();
  const phase = useAppSelector(selectPhase);
  const clientId = useAppSelector((state) => state.player.id);
  const [socket, setSocket] = useState<Socket | null>(null);

  useTrackPage();

  useEffect(() => {
    // If no clientId, go back to landing
    if (clientId == null) {
      history.push("/");
      return;
    }

    const newSocket = io("http://127.0.0.1:5000", {
      query: { clientId: clientId },
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      <Phase phase={phase} />
    </SocketContext.Provider>
  );
};

export default Room;
