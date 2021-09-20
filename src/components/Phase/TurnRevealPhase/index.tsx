import React, { useContext } from "react";
import styled from "styled-components";

import { ReactComponent as ArrowDown } from "../../../assets/ArrowDown.svg";
import SocketContext from "../../../contexts/SocketContext";
import { useAppSelector } from "../../../redux/hooks";
import { selectPlayerId } from "../../../redux/playerSlice";
import Button, { ButtonType } from "../../Button";
import { GameFooter, GameHeader, GameMain, WaitingMessage } from "../../Styles";
import PhaseHeading from "../components/PhaseHeading";
import {
  AnswerOption,
  PlayerOption,
  Question,
  SectionHeading,
} from "../Styles";
import AnswerValidity from "./components/AnswerValidity";
import Standings from "./components/Standings";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
`;
const PhaseHeader = styled(GameHeader)`
  position: relative;
`;

const StyledQuestion = styled(Question)`
  margin: 10px 95px 10px 20px;
`;

const PhaseMain = styled(GameMain)`
  display: flex;
  flex-direction: column;
`;

const Reveal = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px 30px 20px;

  ${AnswerOption} {
    margin: 0;
  }

  ${SectionHeading} {
    margin: 0 0 5px;
  }
`;

const TurnRevealPhase: React.FC = function () {
  const socketContext = useContext(SocketContext);

  const {
    roomCode,
    host: hostId,
    currQuestion,
    currAnswerer: currAnswererId,
    selectedPlayerId,
    selectedAnswer,
    players,
  } = useAppSelector((state) => state.gameState);
  const myPlayerId = useAppSelector(selectPlayerId);

  const isPlayerTurn = currAnswererId == myPlayerId;
  const isHost = hostId == myPlayerId;

  const handleNextTurnClick = () => {
    socketContext?.socket?.emit("game-next-turn", {
      roomCode: roomCode,
    });
  };

  // TODO: handle reveal when no answer selected
  return (
    <Wrapper>
      <PhaseHeader>
        <PhaseHeading isPlayerTurn={isPlayerTurn}>
          {isPlayerTurn ? "Your" : `${players[currAnswererId].username}'s`} turn
        </PhaseHeading>
        <StyledQuestion $isBlack>{currQuestion}</StyledQuestion>
      </PhaseHeader>
      <PhaseMain>
        <Reveal>
          <SectionHeading>
            {isPlayerTurn ? "You" : `${players[currAnswererId].username}`}{" "}
            guessed
          </SectionHeading>
          <AnswerOption $isSelected>{selectedAnswer}</AnswerOption>
          <ArrowDown />
          <PlayerOption $isSelected>
            {players[selectedPlayerId]?.username || ""}
          </PlayerOption>
          <AnswerValidity
            selectedPlayerId={selectedPlayerId}
            selectedAnswer={selectedAnswer}
            players={players}
          />
        </Reveal>
        <Standings players={players} />
      </PhaseMain>
      <GameFooter>
        {isHost ? (
          <Button onClick={handleNextTurnClick} type={ButtonType.Host}>
            Next turn
          </Button>
        ) : (
          <WaitingMessage>Waiting for host...</WaitingMessage>
        )}
      </GameFooter>
    </Wrapper>
  );
};

export default TurnRevealPhase;
