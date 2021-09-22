import React, { useEffect } from "react";

import Landing from "../components/Landing";
import SetName from "../components/SetName";
import { useTrackPage } from "../hooks/GoogleAnalytics";
import { resetGameSetup } from "../redux/gameSetupSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Home: React.FC = function () {
  const dispatch = useAppDispatch();
  const { roomCode } = useAppSelector((state) => state.gameSetup);

  useTrackPage();

  useEffect(() => {
    dispatch(resetGameSetup());
  }, []);

  if (roomCode != null) {
    return <SetName />;
  }

  return <Landing />;
};

export default Home;
