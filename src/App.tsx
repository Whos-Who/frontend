import jwt_decode, { JwtPayload } from "jwt-decode";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import SnackBarsList from "./components/SnackBarsList";
import { SOCKET_SERVER_URL } from "./constants";
import SocketContext from "./contexts/SocketContext";
import Deck from "./pages/Deck";
import Decks from "./pages/Decks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import New from "./pages/New";
import NewDeck from "./pages/NewDeck";
import Room from "./pages/Room";
import Signup from "./pages/Signup";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getUserToken, logoutUser } from "./redux/userSlice";

ReactGA.initialize("UA-207607889-1");

const App: React.FC = function () {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  const clientId = useAppSelector((state) => state.player.id);
  const userToken = useAppSelector(getUserToken);
  const snackBars = useAppSelector((state) => state.snackBars);

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

  // Check validity of user login session
  useEffect(() => {
    if (userToken == null) {
      return;
    }

    const checkTokenInterval = setInterval(() => {
      const decodedToken = jwt_decode<JwtPayload>(userToken);
      const expireBuffer = 60000; // 1 minute
      if (
        (decodedToken?.exp ?? 0) * 1000 <
        new Date().getTime() + expireBuffer
      ) {
        dispatch(logoutUser());
      }
    }, 30000);

    return () => clearInterval(checkTokenInterval);
  }, [userToken]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/room/:id">
            <Room />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/decks">
            <Decks />
          </Route>
          <Route exact path="/decks/new">
            <NewDeck />
          </Route>
          <Route path="/decks/:id">
            <Deck />
          </Route>
        </Switch>
      </Router>
      <SnackBarsList snackBars={snackBars} />
    </SocketContext.Provider>
  );
};

export default App;
