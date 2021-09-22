import { Link } from "react-router-dom";
import styled from "styled-components";

interface StyledInputProps {
  $error?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
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
  font-weight: 500;
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

export const GameHeader = styled.div`
  width: 100%;
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
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px 30px 30px;
  border-top: 1px solid ${(props) => props.theme.colors.grayLighter};
  background: ${(props) => props.theme.colors.white};
  width: 100%;

  @media screen and (min-width: 600px) {
    padding: 20px 30px;
    border: 1px solid ${(props) => props.theme.colors.grayLighter};
    min-width: 600px;
    border-radius: 5px;
    width: auto;
  }
`;

export const WaitingMessage = styled.span`
  width: 100%;
  color: ${(props) => props.theme.colors.grayDark};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 500;
  text-align: center;
`;

export const ErrorMessage = styled.span`
  margin-top: 10px;
  color: ${(props) => props.theme.colors.terraCotta};
`;

// TODO; Style loading message
export const Loading = styled.h1`
  text-align: center;
`;

export const AccountText = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.grayDark};
  text-align: center;
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.blue};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 500;
  text-decoration: none;
`;

export const PageTitle = styled.h1`
  margin: 20px 0;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 700;
`;
