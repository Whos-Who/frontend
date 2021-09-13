import React from "react";

import Phase from "../components/Phase";
import { useTrackPage } from "../hooks/GoogleAnalytics";
import { selectPhase } from "../redux/gameStateSlice";
import { useAppSelector } from "../redux/hooks";

const Room: React.FC = function () {
  const phase = useAppSelector(selectPhase);

  useTrackPage();

  return <Phase phase={phase} />;
};

export default Room;
