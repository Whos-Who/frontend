import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 3px;
  border: 1px solid #42ad52;
  background: #62c370;
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
}

const Button: React.FC<Props> = function (props) {
  const { onClick, children } = props;

  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
