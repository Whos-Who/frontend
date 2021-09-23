import React, { useContext, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { GUESS_TIME_LIMIT } from "../../../constants";
import SocketContext from "../../../contexts/SocketContext";
import { useAppSelector } from "../../../redux/hooks";
import { selectPlayerId } from "../../../redux/playerSlice";
import { shuffle } from "../../../utils/shuffleArray";
import Button from "../../Button";
import { GameFooter, GameHeader, GameMain, WaitingMessage } from "../../Styles";
import PhaseHeading from "../components/PhaseHeading";
import Timer from "../components/Timer";
import {
  AnswerOption,
  PlayerOption,
  Question,
  SectionHeading,
} from "../Styles";

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
  margin: 10px 95px 10px 20px;
`;

const AnswersScrollable = styled.div`
  overflow-x: auto;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLighter};
`;

const AnswersList = styled.div`
  display: inline-block;
  white-space: nowrap;
  margin: 12px 20px 20px;
`;

const PlayersList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 12px 20px 20px;
`;

type Option = {
  playerId: string;
  username: string;
  answer?: string;
};

type Options = {
  answers: Option[];
  players: Option[];
};

const TurnGuessPhase: React.FC = function () {
  const theme = useTheme();
  const socketContext = useContext(SocketContext);

  const {
    roomCode,
    currQuestion,
    currAnswerer: currAnswererId,
    players,
  } = useAppSelector((state) => state.gameState);
  const myPlayerId = useAppSelector(selectPlayerId);
  const [options, setOptions] = useState<Options>({
    answers: [],
    players: [],
  });
  const [selectedAnswer, setSelectedAnswer] = useState<Option | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const isPlayerTurn = currAnswererId == myPlayerId;

  useEffect(() => {
    const answerOptions: Option[] = [];
    const playerOptions: Option[] = [];

    for (const [playerId, player] of Object.entries(players)) {
      if (playerId == myPlayerId) {
        continue;
      }

      // Get all players except current player
      playerOptions.push({
        playerId: playerId,
        username: player.username,
      });

      // Get all unguessed answers
      if (player.currAnswer.isGuessed) {
        continue;
      }
      answerOptions.push({
        playerId: playerId,
        username: player.username,
        answer: player.currAnswer.value,
      });
    }

    // Shuffle options for answers
    setOptions({
      answers: shuffle(answerOptions),
      players: playerOptions,
    });
  }, []);

  const handleAnswerClick = (option: Option) => {
    if (isPlayerTurn) {
      setSelectedAnswer(option);
    }
  };

  const handlePlayerClick = (option: Option) => {
    if (isPlayerTurn) {
      setSelectedPlayerId(option.playerId);
    }
  };

  const handleSubmitClick = () => {
    socketContext?.socket?.emit("game-player-match-submission", {
      roomCode: roomCode,
      selectedAnswer: selectedAnswer?.answer,
      selectedPlayerId: selectedPlayerId,
    });
  };

  const isSubmitDisabled = selectedAnswer == null || selectedPlayerId == null;

  return (
    <Wrapper>
      <PhaseHeader>
        <PhaseHeading isPlayerTurn={isPlayerTurn}>
          {isPlayerTurn ? "Your" : `${players[currAnswererId].username}'s`} turn
        </PhaseHeading>
        <StyledQuestion $isBlack>{currQuestion}</StyledQuestion>
        <Timer seconds={GUESS_TIME_LIMIT} />
      </PhaseHeader>
      <GameMain>
        <SectionHeading>Remaining answers</SectionHeading>
        <AnswersScrollable>
          <AnswersList>
            {options.answers.map((option) => (
              <AnswerOption
                key={option.playerId}
                onClick={() => handleAnswerClick(option)}
                $borderColor={
                  option.playerId == selectedAnswer?.playerId
                    ? theme.colors.blue
                    : undefined
                }
              >
                {option.answer}
              </AnswerOption>
            ))}
          </AnswersList>
        </AnswersScrollable>
        <SectionHeading>Remaining players</SectionHeading>
        <PlayersList>
          {options.players.map((option) => (
            <PlayerOption
              key={option.playerId}
              onClick={() => handlePlayerClick(option)}
              $borderColor={
                option.playerId == selectedPlayerId
                  ? theme.colors.blue
                  : undefined
              }
            >
              {option.username}
            </PlayerOption>
          ))}
        </PlayersList>
      </GameMain>
      <GameFooter>
        {isPlayerTurn ? (
          <Button onClick={handleSubmitClick} isDisabled={isSubmitDisabled}>
            Submit
          </Button>
        ) : (
          <WaitingMessage>
            Waiting for {players[currAnswererId].username}...
          </WaitingMessage>
        )}
      </GameFooter>
    </Wrapper>
  );
};

export default TurnGuessPhase;
