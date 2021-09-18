import React from "react";

import { Phase } from "../../constants/Phases";
import LobbyPhase from "./LobbyPhase";
import QuestionPhase from "./QuestionPhase";

interface Props {
  phase: Phase | null;
}

const PhaseSwitch: React.FC<Props> = function (props) {
  const { phase } = props;

  switch (phase) {
    case Phase.QUESTION:
      return <QuestionPhase />;
    case Phase.LOBBY:
    default:
      return <LobbyPhase />;
  }
};

export default PhaseSwitch;
