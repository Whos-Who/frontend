import React from "react";
import styled, { useTheme } from "styled-components";

import { ReactComponent as Award } from "../../../../assets/Award.svg";
import { ReactComponent as Check } from "../../../../assets/Check.svg";
import { ReactComponent as Cross } from "../../../../assets/Cross.svg";
import { useAppSelector } from "../../../../redux/hooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ValidityContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.xl};
`;

const Points = styled.span`
  color: ${(props) => props.theme.colors.grayDark};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSizes.md};
`;

const IconBackground = styled.div<{ $background: string }>`
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background: ${(props) => props.$background};

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface Props {
  currAnswererId: string;
  selectedPlayerId: string;
  selectedAnswer: string;
  players: Record<string, PlayerState>;
}

const AnswerValidity: React.FC<Props> = function (props) {
  const { currAnswererId, selectedPlayerId, selectedAnswer, players } = props;
  const theme = useTheme();
  const alreadyGuessed = useAppSelector(
    (state) => state.validity.alreadyGuessed
  );

  const isValid = players[selectedPlayerId]?.currAnswer.value == selectedAnswer;

  let background;
  let icon;
  let text;

  if (currAnswererId === selectedPlayerId) {
    background = theme.colors.blue;
    icon = <Award />;
    text = "Last man standing!";
  } else if (alreadyGuessed) {
    background = theme.colors.grayDark;
    icon = <Check />;
    text = "Already guessed!";
  } else if (isValid) {
    background = theme.colors.emerald;
    icon = <Check />;
    text = "Correct!";
  } else {
    background = theme.colors.terraCotta;
    icon = <Cross />;
    text = "Incorrect!";
  }

  let scoreIncrement = 0;

  if (!alreadyGuessed) {
    scoreIncrement = Object.values(players)
      .map((player): number => (player.currAnswer.isGuessed ? 0 : 1))
      .reduce((a, b) => a + b, 1);
  }

  return (
    <Wrapper>
      <ValidityContainer>
        <IconBackground $background={background}>{icon}</IconBackground>
        {text}
      </ValidityContainer>
      {isValid && (
        <Points>
          + {scoreIncrement} point{scoreIncrement != 1 && "s"}
        </Points>
      )}
    </Wrapper>
  );
};

export default AnswerValidity;
