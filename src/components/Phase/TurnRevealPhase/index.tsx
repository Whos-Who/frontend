import React from "react";
import styled from "styled-components";

import { ReactComponent as ArrowDown } from "../../../assets/ArrowDown.svg";
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

const Reveal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  ${AnswerOption} {
    margin: 0;
  }

  ${SectionHeading} {
    margin-bottom: 5px;
  }
`;

const TurnRevealPhase: React.FC = function () {
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

  return (
    <Wrapper>
      <PhaseHeader>
        <PhaseHeading isPlayerTurn={isPlayerTurn}>
          {players[currAnswererId].username}&apos;s turn
        </PhaseHeading>
        <StyledQuestion $isBlack>{currQuestion}</StyledQuestion>
      </PhaseHeader>
      <GameMain>
        <Reveal>
          <SectionHeading>
            {players[currAnswererId].username} guessed
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
      </GameMain>
      <GameFooter>
        {isHost ? (
          <Button onClick={() => console.log("ok")} type={ButtonType.Host}>
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
