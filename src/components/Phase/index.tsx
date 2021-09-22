import React from "react";

import { Phase } from "../../constants/Phases";
import LobbyPhase from "./LobbyPhase";
import QuestionPhase from "./QuestionPhase";
import ScoreboardPhase from "./ScoreboardPhase";
import TurnGuessPhase from "./TurnGuessPhase";
import TurnRevealPhase from "./TurnRevealPhase";

interface Props {
  phase: Phase | null;
}

const PhaseSwitch: React.FC<Props> = function (props) {
  const { phase } = props;

  switch (phase) {
    case Phase.SCOREBOARD:
      return <ScoreboardPhase />;
    case Phase.TURN_REVEAL:
      return <TurnRevealPhase />;
    case Phase.TURN_GUESS:
      return <TurnGuessPhase />;
    case Phase.QUESTION:
      return <QuestionPhase />;
    case Phase.LOBBY:
    default:
      return <LobbyPhase />;
  }
};

export default PhaseSwitch;
