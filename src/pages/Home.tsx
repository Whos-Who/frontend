import { customAlphabet } from "nanoid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/Button";
import { trackPage } from "../components/GoogleAnalytics";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 30px;
`;

const ROOM_CODE_LENGTH = 4;
const ROOM_CODE_SYMBOLS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Home: React.FC = function () {
  const nanoid = customAlphabet(ROOM_CODE_SYMBOLS, ROOM_CODE_LENGTH);
  const history = useHistory();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [roomCodeInput, setRoomCodeInput] = useState<string>("");

  useEffect(() => {
    trackPage();
  }, []);

  const handleNewGameClick = () => {
    history.push(`/room/${nanoid()}`);
  };

  const handleJoinGameClick = () => {
    if (roomCodeInput.length === 0) {
      setErrorMsg("Please enter a room code");
    } else if (roomCodeInput.length != ROOM_CODE_LENGTH) {
      setErrorMsg(`Room ${roomCodeInput} does not exist`);
    } else {
      // TODO: Check if room code is valid before redirecting
      history.push(`/room/${roomCodeInput}`);
    }
  };

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCodeInput(e.target.value);
  };

  return (
    <Wrapper>
      <h1>Who&lsquo;s who?</h1>
      <Button onClick={handleNewGameClick}>New Game</Button>
      <input
        type="text"
        placeholder="Enter room code"
        value={roomCodeInput}
        onChange={handleRoomCodeChange}
      />
      <Button onClick={handleJoinGameClick}>Join Game</Button>
      {errorMsg && <span>{errorMsg}</span>}
    </Wrapper>
  );
};

export default Home;
