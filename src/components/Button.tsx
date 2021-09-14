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
  border: 1px solid #42ad52;
  background: ${(props) => generateButtonColor(props)};
  color: ${(props) => props.theme.colors.isabelline};
  font-family: ${(props) => props.theme.typeface};
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #42ad52;
  }
`;

interface Props {
  onClick: React.MouseEventHandler;
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
}

const Button: React.FC<Props> = function (props) {
  const { onClick, children, primary, secondary, danger } = props;

  return (
    <StyledButton
      onClick={onClick}
      primary={primary}
      secondary={secondary}
      danger={danger}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
