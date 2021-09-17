import React from "react";

import { Phase } from "../../constants/Phases";
import Lobby from "./screens/Lobby";
import QuestionPhase from "./screens/QuestionPhase";

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
