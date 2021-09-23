import React, { useContext } from "react";
import styled from "styled-components";

import SocketContext from "../../../contexts/SocketContext";
import { useAppSelector } from "../../../redux/hooks";
import { selectPlayerId } from "../../../redux/playerSlice";
import Button, { ButtonType } from "../../Button";
import { GameFooter, GameHeader, GameMain, WaitingMessage } from "../../Styles";
import PhaseHeading from "../components/PhaseHeading";
import { Question } from "../Styles";
import ScoreList from "./components/ScoreList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const PhaseHeader = styled(GameHeader)`
  position: relative;
`;

const StyledQuestion = styled(Question)`
  margin: 10px 20px;
`;

const PhaseMain = styled(GameMain)`
  display: flex;
  flex-direction: column;
`;

const ScoreboardPhase: React.FC = function () {
  const socketContext = useContext(SocketContext);

  const {
    roomCode,
    host: hostId,
    currQuestion,
    players,
    questionsLeft,
  } = useAppSelector((state) => state.gameState);
  const myPlayerId = useAppSelector(selectPlayerId);

  const isHost = hostId == myPlayerId;

  const handleNextQuestionClick = () => {
    socketContext?.socket?.emit("game-next-question", {
      roomCode: roomCode,
    });
  };

  const handleEndGameClick = () => {
    socketContext?.socket?.emit("game-end", {
      roomCode: roomCode,
    });
  };

  return (
    <Wrapper>
      <PhaseHeader>
        <PhaseHeading>Round over!</PhaseHeading>
        <StyledQuestion $isBlack>{currQuestion}</StyledQuestion>
      </PhaseHeader>
      <PhaseMain>
        <ScoreList players={players} />
      </PhaseMain>
      <GameFooter>
        {isHost ? (
          <>
            {questionsLeft > 0 && (
              <Button onClick={handleNextQuestionClick} type={ButtonType.Host}>
                Next Question ({questionsLeft} left)
              </Button>
            )}
            <Button onClick={handleEndGameClick} type={ButtonType.Danger}>
              End Game
            </Button>
          </>
        ) : (
          <WaitingMessage>Waiting for host...</WaitingMessage>
        )}
      </GameFooter>
    </Wrapper>
  );
};

export default ScoreboardPhase;
