import React from "react";
import styled from "styled-components";

import { ReactComponent as Check } from "../../../../assets/Check.svg";
import { ReactComponent as Cross } from "../../../../assets/Cross.svg";

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.xl};
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

  return (
    <Container>
      <CheckCrossBackground $isValid={isValid}>
        {isValid ? <Check /> : <Cross />}
      </CheckCrossBackground>
      {isValid ? "Correct!" : "Incorrect!"}
    </Container>
  );
};

export default AnswerValidity;
