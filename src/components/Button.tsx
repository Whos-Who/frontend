import React from "react";
import ReactLoading from "react-loading";
import styled, { useTheme } from "styled-components";

type StyledButtonProps = {
  $primaryColor: string;
  $secondaryColor: string;
  $isDisabled?: boolean;
  $isLoading?: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  padding: 8px;
  border: 2px solid ${(props) => props.$secondaryColor};
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
    cursor: default;
    border: 2px solid ${props.theme.colors.grayDark};
    background: ${props.theme.colors.grayLight};
  `};

  ${(props) =>
    props.$isLoading &&
    `
    cursor: default;
  `};

  :hover {
    ${(props) =>
      !props.$isDisabled &&
      `
      background: ${props.$secondaryColor};
    `};
  }
`;

export const ButtonType = {
  Default: "default" as const,
  Host: "host" as const,
  Danger: "danger" as const,
};

export type ButtonTypeValues = typeof ButtonType[keyof typeof ButtonType];

interface Props {
  className?: string;
  onClick: React.MouseEventHandler;
  type?: ButtonTypeValues;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<Props> = function (props) {
  const { className, onClick, type, isDisabled, children, isLoading } = props;
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
      className={className}
      onClick={onClick}
      $primaryColor={primaryColor}
      $secondaryColor={secondaryColor}
      $isDisabled={isDisabled}
      $isLoading={isLoading}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <ReactLoading type="bubbles" height={20} width={20} />
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;
