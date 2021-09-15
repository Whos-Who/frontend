import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/PrimaryLogo.svg";
import { SOCKET_SERVER_URL } from "../constants";
import { setGameState } from "../redux/gameStateSlice";
import { useAppDispatch } from "../redux/hooks";
import { setPlayerId, setPlayerName } from "../redux/playerSlice";
import Button from "./Button";
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

const StyledLogo = styled(Logo)`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
`;

const InputPrompt = styled.h2`
  margin: 0 0 15px;
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.black};
`;

interface Props {
  roomCode: string;
}

const SetName: React.FC<Props> = function (props) {
  const { roomCode } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const clientId = nanoid();
    dispatch(setPlayerId({ id: clientId }));
    const newSocket = io(SOCKET_SERVER_URL, {
      query: { clientId: clientId },
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    // Redirect to game lobby once a response is received
    const roomListener = (gameState: GameState) => {
      dispatch(setGameState(gameState));
      history.push(`/room/${gameState.roomCode}`);
    };

    socket?.on("room-join", roomListener);

    return () => {
      socket?.off("room-join", roomListener);
    };
  }, [socket]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // TODO: validate name
  const handleNextClick = () => {
    if (!socket) {
      return;
    }

    if (roomCode.length > 0) {
      socket.emit("room-join", { username: name, roomCode: roomCode });
    } else {
      socket.emit("room-create", { username: name });
    }

    dispatch(setPlayerName({ name: name }));
  };

  return (
    <Wrapper>
      <StyledLogo />
      <InputPrompt>Your Name</InputPrompt>
      <StyledInput
        placeholder="Enter name"
        value={name}
        onChange={handleNameChange}
      />
      <Button onClick={handleNextClick}>Next</Button>
    </Wrapper>
  );
};

export default SetName;
