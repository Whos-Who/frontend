import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";

import { setGameState } from "../redux/gameStateSlice";
import { useAppDispatch } from "../redux/hooks";
import { setPlayerId, setPlayerName } from "../redux/playerSlice";
import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 30px;
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
    const newSocket = io("http://127.0.0.1:5000", {
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
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={handleNameChange}
      />
      <Button onClick={handleNextClick}>Next</Button>
    </Wrapper>
  );
};

export default SetName;
