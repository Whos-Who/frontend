import React from "react";
import styled, { useTheme } from "styled-components";

type StyledButtonProps = {
  $primaryColor: string;
  $secondaryColor: string;
  $isDisabled?: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  padding: 10px;
  border: 1px solid ${(props) => props.$secondaryColor};
  border-radius: 3px;
  background: ${(props) => props.$primaryColor};
  color: ${(props) => props.theme.colors.isabelline};
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 500;
  cursor: pointer;

  ${(props) =>
    props.$isDisabled &&
    `
    border: 1px solid ${props.theme.colors.grayDark};
    background: ${props.theme.colors.grayLight};
  `};

  :hover {
    background: ${(props) => props.$secondaryColor};
  }
`;

export const ButtonType = {
  Default: "default" as const,
  Host: "host" as const,
  Danger: "danger" as const,
};

export type ButtonTypeValues = typeof ButtonType[keyof typeof ButtonType];

interface Props {
  onClick: React.MouseEventHandler;
  type?: ButtonTypeValues;
  isDisabled?: boolean;
}

const Button: React.FC<Props> = function (props) {
  const { onClick, type, isDisabled, children } = props;
  const theme = useTheme();

  let primaryColor;
  let secondaryColor;

  switch (type) {
    case ButtonType.Host:
      primaryColor = theme.colors.emerald;
      secondaryColor = theme.colors.emeraldDark;
      break;
    case ButtonType.Danger:
      primaryColor = theme.colors.terraCotta;
      secondaryColor = theme.colors.terraCottaDark;
      break;
    case ButtonType.Default:
    default:
      primaryColor = theme.colors.blue;
      secondaryColor = theme.colors.blueDark;
      break;
  }

  return (
    <StyledButton
      onClick={onClick}
      $primaryColor={primaryColor}
      $secondaryColor={secondaryColor}
      $isDisabled={isDisabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
