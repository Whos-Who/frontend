import React, { useContext } from "react";
import styled, { useTheme } from "styled-components";

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
  const theme = useTheme();
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

  const currAnswererUsername = players[currAnswererId].username;
  const isHost = hostId == myPlayerId;
  const isPlayerTurn = currAnswererId == myPlayerId;

  // If answerer did not guess within 30s
  const didNotGuess = selectedPlayerId === "" && selectedAnswer === "";

  // Edge case where the last answer belongs to the currentAnswerer
  const isAnswerersAnswer = currAnswererId === selectedPlayerId;

  const isAnswerValid =
    players[selectedPlayerId]?.currAnswer.value == selectedAnswer;

  let revealHeading;
  let borderColor;

  if (isAnswerersAnswer) {
    revealHeading = `No one guessed ${
      isPlayerTurn ? "your" : `${currAnswererUsername}'s'`
    } answer!`;
    borderColor = theme.colors.blue;
  } else {
    revealHeading = `${isPlayerTurn ? "You" : currAnswererUsername}`;

    if (didNotGuess) {
      revealHeading += " did not guess...";
    } else {
      revealHeading += " guessed";
    }

    if (isAnswerValid) {
      borderColor = theme.colors.emerald;
    } else {
      borderColor = theme.colors.terraCotta;
    }
  }

  const handleNextTurnClick = () => {
    socketContext?.socket?.emit("game-next-turn", {
      roomCode: roomCode,
    });
  };

  return (
    <Wrapper>
      <PhaseHeader>
        <PhaseHeading isPlayerTurn={isPlayerTurn}>
          {isPlayerTurn ? "Your" : `${currAnswererUsername}'s`} turn
        </PhaseHeading>
        <StyledQuestion $isBlack>{currQuestion}</StyledQuestion>
      </PhaseHeader>
      <PhaseMain>
        <Reveal>
          <SectionHeading>{revealHeading}</SectionHeading>
          {!didNotGuess && (
            <>
              <AnswerOption $borderColor={borderColor}>
                {selectedAnswer}
              </AnswerOption>
              <ArrowDown />
              <PlayerOption $borderColor={borderColor}>
                {currAnswererUsername}
              </PlayerOption>
              <AnswerValidity
                currAnswererId={currAnswererId}
                selectedPlayerId={selectedPlayerId}
                selectedAnswer={selectedAnswer}
                players={players}
              />
            </>
          )}
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
