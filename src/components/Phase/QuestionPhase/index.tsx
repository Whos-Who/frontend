import React, { useContext, useEffect, useState } from "react";

import SocketContext from "../../../contexts/SocketContext";
import { setGameState } from "../../../redux/gameStateSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectPlayerId } from "../../../redux/playerSlice";
import QuestionStage from "./components/QuestionStage";
import WaitingStage from "./components/WaitingStage";

const QuestionPhase: React.FC = function () {
  const dispatch = useAppDispatch();
  const socketContext = useContext(SocketContext);

  const playerId = useAppSelector(selectPlayerId);
  const { players } = useAppSelector((state) => state.gameState);

  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  useEffect(() => {
    const gamePlayerReadyListener = (
      response: Sockets.GamePlayerReadyResponse
    ) => {
      dispatch(setGameState(response.gameState));
    };

    socketContext?.socket?.on("game-player-ready", gamePlayerReadyListener);

    return () => {
      socketContext?.socket?.off("game-player-ready", gamePlayerReadyListener);
    };
  }, [socketContext?.socket]);

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
  return <QuestionStage />;
};

export default QuestionPhase;
