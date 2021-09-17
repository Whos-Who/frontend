import React from "react";

import { Phase } from "../../constants/Phases";
import QuestionPhase from "./QuestionPhase";
import Lobby from "./screens/Lobby";

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
      return <Lobby />;
  }
};

export default PhaseSwitch;
