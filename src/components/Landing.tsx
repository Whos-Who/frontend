import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/PrimaryLogo.svg";
import Button, { ButtonType } from "./Button";
import { StyledInput } from "./Styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
`;

const StyledLogo = styled(Logo)``;

const TitleText = styled.h1`
  margin-bottom: 4rem;
`;

const OrText = styled.span`
  margin: 15px 0;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.grayLight};
`;

interface Props {
  roomCode: string;
  setRoomCode: React.Dispatch<React.SetStateAction<string>>;
  setPromptName: React.Dispatch<React.SetStateAction<boolean>>;
}

const Landing: React.FC<Props> = function (props) {
  const { roomCode, setRoomCode, setPromptName } = props;

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleNewGameClick = () => {
    setPromptName(true);
  };

  // TODO: validate room code
  const handleJoinGameClick = () => {
    if (roomCode.length === 0) {
      setErrorMsg("Please enter a room code");
    } else {
      setPromptName(true);
    }
  };

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  return (
    <Wrapper>
      <StyledLogo />
      <TitleText>Who&lsquo;s who?</TitleText>
      <Button onClick={handleNewGameClick} type={ButtonType.Host}>
        New Game
      </Button>
      <OrText>or</OrText>
      <StyledInput
        placeholder="Enter room code"
        value={roomCode}
        onChange={handleRoomCodeChange}
      />
      <Button onClick={handleJoinGameClick}>Join Game</Button>
      {errorMsg && <span>{errorMsg}</span>}
    </Wrapper>
  );
};

export default Landing;
