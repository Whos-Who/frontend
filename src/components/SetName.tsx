import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/PrimaryLogo.svg";
import SocketContext from "../contexts/SocketContext";
import { setGameState } from "../redux/gameStateSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPlayerId, setPlayerName } from "../redux/playerSlice";
import { getUsername } from "../redux/userSlice";
import Button, { ErrorMessage } from "./Button";
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

interface Props {
  roomCode: string;
}

const SetName: React.FC<Props> = function (props) {
  const { roomCode } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const socketContext = useContext(SocketContext);

  const [name, setName] = useState<string>(useAppSelector(getUsername) ?? "");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);

  // Set up clientId, which will initiate a socket connection
  useEffect(() => {
    const clientId = nanoid();
    dispatch(setPlayerId({ id: clientId }));
  }, []);

  // Redirect to game lobby once a response is received
  useEffect(() => {
    const roomListener = (response: Sockets.RoomJoinResponse) => {
      setIsCreatingRoom(false);
      dispatch(setGameState(response));
      history.push(`/room/${response.roomCode}`);
    };

    socketContext?.socket?.on("room-join", roomListener);

    return () => {
      socketContext?.socket?.off("room-join", roomListener);
    };
  }, [socketContext?.socket]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMsg) {
      setErrorMsg(null);
    }
    setName(e.target.value);
  };

  // TODO: validate name
  const handleNextClick = () => {
    if (name.length == 0) {
      setErrorMsg("Please enter a name!");
      return;
    }
    if (!socketContext?.socket) {
      setErrorMsg("Connection error!");
      return;
    }
    setIsCreatingRoom(true);
    if (roomCode.length > 0) {
      socketContext?.socket.emit("room-join", {
        username: name,
        roomCode: roomCode,
      });
    } else {
      socketContext?.socket.emit("room-create", { username: name });
    }

    dispatch(setPlayerName({ name: name }));
  };

  return (
    <Wrapper>
      <StyledLogo />
      <StyledInput
        $error={errorMsg != null}
        placeholder="Enter Your Name"
        value={name}
        onChange={handleNameChange}
      />
      <Button onClick={handleNextClick} isLoading={isCreatingRoom}>
        Next
      </Button>
      <ErrorMessage>&nbsp;{errorMsg}&nbsp;</ErrorMessage>
    </Wrapper>
  );
};

export default SetName;
