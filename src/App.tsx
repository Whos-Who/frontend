import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import { SOCKET_SERVER_URL } from "./constants";
import SocketContext from "./contexts/SocketContext";
import { initializeGoogleAnalytics } from "./hooks/GoogleAnalytics";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Room from "./pages/Room";
import { useAppSelector } from "./redux/hooks";

const App: React.FC = function () {
  const [socket, setSocket] = useState<Socket | null>(null);
  const clientId = useAppSelector((state) => state.player.id);

  initializeGoogleAnalytics();

  // Connect to socket if clientId changes
  useEffect(() => {
    if (clientId == null) {
      return;
    }

    const newSocket = io(SOCKET_SERVER_URL, {
      query: {
        clientId: clientId,
      },
    });
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      socket?.close();
    };
  }, [clientId]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/room/:id">
            <Room />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
};

export default App;
