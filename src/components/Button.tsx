import React from "react";
import styled from "styled-components";

const generateButtonColor = (props: any) => {
  if (props.primary) {
    return props.theme.colors.emerald;
  } else if (props.secondary) {
    return props.theme.colors.blue;
  } else if (props.danger) {
    return props.theme.colors.terraCotta;
  } else {
    return props.theme.colors.emerald;
  }
};

const StyledButton = styled.button<Props>`
  border-radius: 3px;
  border: 1px solid ${(props) => generateButtonColor(props)};
  background: ${(props) => generateButtonColor(props)};
  color: ${(props) => props.theme.colors.isabelline};
  font-family: ${(props) => props.theme.typeface};
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;
  ${(props) =>
    props.width &&
    `
    width: ${props.width};
  `}
  ${(props) =>
    props.height &&
    `
    height: ${props.height};
  `}

  &:hover {
    background: ${(props) => generateButtonColor(props)};
  }
`;

interface Props {
  onClick: React.MouseEventHandler;
  width?: string;
  height?: string;
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
}

const Button: React.FC<Props> = function (props) {
  const { onClick, children, primary, secondary, danger, width, height } =
    props;

  return (
    <StyledButton
      onClick={onClick}
      primary={primary}
      secondary={secondary}
      danger={danger}
      width={width}
      height={height}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
