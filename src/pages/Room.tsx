import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";

import Phase from "../components/Phase";
import SocketContext from "../contexts/SocketContext";
import { useTrackPage } from "../hooks/GoogleAnalytics";
import { useNewHost } from "../hooks/userSocketEvents";
import { resetGameState, selectPhase } from "../redux/gameStateSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetPlayerState } from "../redux/playerSlice";

const Room: React.FC = function () {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const socketContext = useContext(SocketContext);

  const phase = useAppSelector(selectPhase);
  const clientId = useAppSelector((state) => state.player.id);

  useTrackPage();

  useNewHost(dispatch, socketContext);

  useEffect(() => {
    // If no clientId, go back to landing
    if (clientId == null) {
      dispatch(resetGameState());
      dispatch(resetPlayerState());
      history.push("/");
    }
  }, []);

  return <Phase phase={phase} />;
};

export default Room;
