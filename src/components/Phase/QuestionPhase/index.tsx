import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../../redux/hooks";
import { selectPlayerId } from "../../../redux/playerSlice";
import QuestionStage from "./components/QuestionStage";
import WaitingStage from "./components/WaitingStage";

const QuestionPhase: React.FC = function () {
  const playerId = useAppSelector(selectPlayerId);
  const { players } = useAppSelector((state) => state.gameState);

  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  useEffect(() => {
    if (playerId == null || hasAnswered) {
      return;
    }

    if (players[playerId].currAnswer.value != "") {
      setHasAnswered(true);
    }
  }, [players]);

  if (hasAnswered) {
    return <WaitingStage />;
  }
  return <QuestionStage setHasAnswered={setHasAnswered} />;
};

export default QuestionPhase;
