import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppSelector } from "../../../redux/hooks";
import { selectPlayerId } from "../../../redux/playerSlice";
import { shuffle } from "../../../utils/shuffleArray";
import Button from "../../Button";
import { GameFooter, GameHeader, GameMain, WaitingMessage } from "../../Styles";
import PhaseHeading from "../components/PhaseHeading";
import Timer from "../components/Timer";
import { AnswerOption, PlayerOption, Question } from "../Styles";

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

const SectionHeading = styled.h4`
  margin: 15px 20px 0;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 700;
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
  answer: string;
};

interface RemainingOptions {
  answers: Option[];
  players: Option[];
}

const TurnGuessPhase: React.FC = function () {
  const {
    currQuestion,
    currAnswerer: currAnswererId,
    players,
  } = useAppSelector((state) => state.gameState);

  const myPlayerId = useAppSelector(selectPlayerId);
  const [remainingOptions, setRemainingOptions] = useState<RemainingOptions>({
    answers: [],
    players: [],
  });
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const isPlayerTurn = currAnswererId == myPlayerId;

  useEffect(() => {
    const unShuffledOptions: Option[] = [];

    // Get all remaining options
    for (const [playerId, player] of Object.entries(players)) {
      if (playerId == myPlayerId) {
        continue;
      }
      if (player.currAnswer.isGuessed) {
        continue;
      }
      unShuffledOptions.push({
        playerId: playerId,
        username: player.username,
        answer: player.currAnswer.value,
      });
    }

    setRemainingOptions({
      answers: shuffle(unShuffledOptions),
      players: shuffle(unShuffledOptions),
    });
  }, []);

  const handleAnswerClick = (option: Option) => {
    if (isPlayerTurn) {
      setSelectedOption(option);
    }
  };

  const handlePlayerClick = (option: Option) => {
    if (isPlayerTurn) {
      setSelectedPlayerId(option.playerId);
    }
  };

  return (
    <Wrapper>
      <PhaseHeader>
        <PhaseHeading isPlayerTurn={isPlayerTurn}>
          {players[currAnswererId].username}&apos;s turn
        </PhaseHeading>
        <StyledQuestion $isBlack>{currQuestion}</StyledQuestion>
        <Timer seconds={30} />
      </PhaseHeader>
      <GameMain>
        <SectionHeading>Remaining answers</SectionHeading>
        <AnswersScrollable>
          <AnswersList>
            {remainingOptions.answers.map((option) => (
              <AnswerOption
                key={option.playerId}
                onClick={() => handleAnswerClick(option)}
                $isSelected={option.playerId == selectedOption?.playerId}
              >
                {option.answer}
              </AnswerOption>
            ))}
          </AnswersList>
        </AnswersScrollable>
        <SectionHeading>Remaining players</SectionHeading>
        <PlayersList>
          {remainingOptions.players.map((option) => (
            <PlayerOption
              key={option.playerId}
              onClick={() => handlePlayerClick(option)}
              $isSelected={option.playerId == selectedPlayerId}
            >
              {option.username}
            </PlayerOption>
          ))}
        </PlayersList>
      </GameMain>
      <GameFooter>
        {isPlayerTurn ? (
          <Button onClick={() => console.log("clck")}>Submit</Button>
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
