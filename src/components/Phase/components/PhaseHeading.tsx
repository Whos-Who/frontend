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
  isPlayerTurn?: boolean;
}

const PhaseHeading: React.FC<Props> = function (props) {
  const { children, isPlayerTurn } = props;

  const theme = useTheme();
  let color;

  if (isPlayerTurn == null) {
    color = theme.colors.grayDark;
  } else {
    if (isPlayerTurn) {
      color = theme.colors.emerald;
    } else {
      color = theme.colors.blue;
    }
  }

  return <Heading $color={color}>{children}</Heading>;
};

export default PhaseHeading;
