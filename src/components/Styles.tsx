import styled from "styled-components";

interface StyledInputProps {
  $error?: boolean;
}

export const StyledInput = styled.input.attrs({
  type: "text",
})<StyledInputProps>`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 0;
  border: 1px solid
    ${(props) =>
      props.$error
        ? props.theme.colors.terraCotta
        : props.theme.colors.grayLight};
  border-radius: 3px;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: center;
  animation: ${(props) =>
    props.$error && "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both"};

  ::placeholder {
    color: ${(props) => props.theme.colors.grayLight};
  }

  :focus::placeholder {
    color: transparent;
  }

  :focus {
    outline: none;
    border: 1px solid
      ${(props) =>
        props.$error ? props.theme.colors.terraCotta : props.theme.colors.blue};
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;

export const StyledPasswordInput = styled.input.attrs({
  type: "password",
})`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 0;
  border: 1px solid ${(props) => props.theme.colors.grayLight};
  border-radius: 3px;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: center;

  ::placeholder {
    color: ${(props) => props.theme.colors.grayLight};
  }
`;

export const GameHeader = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLighter};
  background: ${(props) => props.theme.colors.white};
`;

export const GameMain = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const GameFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 30px 10px;
  border-top: 1px solid ${(props) => props.theme.colors.grayLighter};
  background: ${(props) => props.theme.colors.white};
`;

export const WaitingMessage = styled.span`
  width: 100%;
  color: ${(props) => props.theme.colors.grayDark};
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: center;
`;
