import React, { useEffect } from "react";
import { useHistory } from "react-router";

import Phase from "../components/Phase";
import { useTrackPage } from "../hooks/GoogleAnalytics";
import { selectPhase } from "../redux/gameStateSlice";
import { useAppSelector } from "../redux/hooks";

const Room: React.FC = function () {
  const history = useHistory();
  const phase = useAppSelector(selectPhase);
  const clientId = useAppSelector((state) => state.player.id);

  useTrackPage();

  // TODO: Reset redux state
  useEffect(() => {
    // If no clientId, go back to landing
    if (clientId == null) {
      history.push("/");
      return;
    }
  }, []);

  return <Phase phase={phase} />;
};

export default Room;
