import React from "react";

import { Phase } from "../../constants/Phases";
import Lobby from "./components/Lobby";
import SetName from "./components/SetName";

interface Props {
  phase: Phase | null;
}

const PhaseSwitch: React.FC<Props> = function (props) {
  const { phase } = props;

  switch (phase) {
    case Phase.LOBBY:
      return <Lobby />;
    case null:
    default:
      return <SetName />;
  }
};

export default PhaseSwitch;
