import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/PrimaryLogo.svg";
import SocketContext from "../contexts/SocketContext";
import { resetGameSetup } from "../redux/gameSetupSlice";
import { setGameState } from "../redux/gameStateSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPlayerId, setPlayerName } from "../redux/playerSlice";
import { getUsername } from "../redux/userSlice";
import Button from "./Button";
import { ErrorMessage, StyledInput } from "./Styles";

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
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
`;

const BackText = styled.div`
  margin-top: 15px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.grayDark};
  text-align: center;
`;

const Back = styled.span`
  color: ${(props) => props.theme.colors.blue};
  cursor: pointer;
`;

const SetName: React.FC = function () {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const socketContext = useContext(SocketContext);

  const { roomCode, deckId } = useAppSelector((state) => state.gameSetup);
  const [name, setName] = useState<string>(useAppSelector(getUsername) ?? "");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);

  const isNewRoom = roomCode == null && deckId != null;

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

    const errorListener = () => {
      setIsCreatingRoom(false);
      setErrorMsg("Name already taken!");
    };

    socketContext?.socket?.on("room-join", roomListener);
    socketContext?.socket?.on("error-room-join", errorListener);

    return () => {
      socketContext?.socket?.off("room-join", roomListener);
      socketContext?.socket?.off("error-room-join", errorListener);
    };
  }, [socketContext?.socket]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMsg) {
      setErrorMsg(null);
    }
    setName(e.target.value);
  };

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
    if (roomCode != null) {
      socketContext?.socket.emit("room-join", {
        username: name,
        roomCode: roomCode,
      });
    } else {
      socketContext?.socket.emit("room-create", { username: name });
    }

    dispatch(setPlayerName({ name: name }));
  };

  const handleBackClick = () => {
    dispatch(resetGameSetup());

    if (!isNewRoom) {
      history.push("");
    }
  };

  return (
    <Wrapper>
      <StyledLogo />
      <StyledInput
        type="text"
        $error={errorMsg != null}
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
        maxLength={12}
      />
      <Button onClick={handleNextClick} isLoading={isCreatingRoom}>
        Next
      </Button>
      <BackText>
        Or&nbsp;
        <Back onClick={handleBackClick}>
          {isNewRoom ? "select another deck" : "join a different room"}
        </Back>
      </BackText>
      <ErrorMessage>&nbsp;{errorMsg}&nbsp;</ErrorMessage>
    </Wrapper>
  );
};

export default SetName;
