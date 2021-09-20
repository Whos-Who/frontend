import React from "react";
import styled from "styled-components";

import { ReactComponent as Check } from "../../../../assets/Check.svg";
import { ReactComponent as Cross } from "../../../../assets/Cross.svg";

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

const CheckCrossBackground = styled.div<{ $isValid: boolean }>`
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background: ${(props) =>
    props.$isValid
      ? props.theme.colors.emerald
      : props.theme.colors.terraCotta};

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface Props {
  selectedPlayerId: string;
  selectedAnswer: string;
  players: Record<string, PlayerState>;
}

const AnswerValidity: React.FC<Props> = function (props) {
  const { selectedPlayerId, selectedAnswer, players } = props;

  const isValid = players[selectedPlayerId]?.currAnswer.value == selectedAnswer;

  const scoreIncrement = Object.values(players)
    .map((player): number => (player.currAnswer.isGuessed ? 0 : 1))
    .reduce((a, b) => a + b, 0);

  return (
    <Wrapper>
      <ValidityContainer>
        <CheckCrossBackground $isValid={isValid}>
          {isValid ? <Check /> : <Cross />}
        </CheckCrossBackground>
        {isValid ? "Correct!" : "Incorrect!"}
      </ValidityContainer>
      {isValid && <Points>+ {scoreIncrement} points</Points>}
    </Wrapper>
  );
};

export default AnswerValidity;
