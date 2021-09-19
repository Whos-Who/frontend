import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div<{ $isRed: boolean }>`
  position: absolute;
  top: 10px;
  right: 20px;
  height: 63px;
  width: 63px;
  border-radius: 100%;
  ${(props) => css`
    border: 3px solid ${props.theme.colors.white};
    background: ${props.$isRed
      ? props.theme.colors.terraCotta
      : props.theme.colors.emerald};
    color: ${props.theme.colors.isabelline};
    font-size: ${props.theme.fontSizes.xl};
  `};
  font-weight: 700;
  line-height: 57px;
  text-align: center;
`;

interface Props {
  seconds: number;
}

const Timer: React.FC<Props> = function (props) {
  const { seconds } = props;

  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return <Container $isRed={timeLeft <= 10}>{timeLeft}</Container>;
};

export default Timer;
