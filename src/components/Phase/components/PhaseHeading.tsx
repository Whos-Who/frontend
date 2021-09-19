import React from "react";
import styled, { useTheme } from "styled-components";

const Heading = styled.div<{ $color: string }>`
  padding: 5px 20px;
  background: ${(props) => props.$color};
  color: ${(props) => props.theme.colors.isabelline};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 700;
`;

interface Props {
  currAnswererId?: string;
  playerId?: string | null;
}

const PhaseHeading: React.FC<Props> = function (props) {
  const { children, currAnswererId, playerId } = props;

  const theme = useTheme();
  let color;

  if (currAnswererId != null && playerId != null) {
    if (currAnswererId == playerId) {
      color = theme.colors.emerald;
    } else {
      color = theme.colors.blue;
    }
  } else {
    color = theme.colors.grayDark;
  }

  return <Heading $color={color}>{children}</Heading>;
};

export default PhaseHeading;
