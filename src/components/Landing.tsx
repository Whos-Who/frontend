import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import Logo from "./Logo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 30px;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const TitleText = styled.h1`
  margin-bottom: 4rem;
`;

const OrText = styled.h5`
  color: ${(props) => props.theme.colors.gray};
  margin: 0;
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
      <Logo width="50%" height="50%" primary />
      <TitleText>Who&lsquo;s who?</TitleText>
      <Button onClick={handleNewGameClick} primary width="100%">
        New Game
      </Button>
      <OrText>or</OrText>
      <input
        type="text"
        placeholder="Enter room code"
        value={roomCode}
        onChange={handleRoomCodeChange}
        style={{ width: "100%", padding: "10px" }}
      />
      <Button onClick={handleJoinGameClick} secondary width="100%">
        Join Game
      </Button>
      {errorMsg && <span>{errorMsg}</span>}
    </Wrapper>
  );
};

export default Landing;
