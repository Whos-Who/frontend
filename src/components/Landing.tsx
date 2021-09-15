import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 30px;
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
      <h1>Who&lsquo;s who?</h1>
      <Button onClick={handleNewGameClick}>New Game</Button>
      <input
        type="text"
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
