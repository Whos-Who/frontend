import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/PrimaryLogo.svg";
import { BACKEND_URL } from "../constants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getIsUserLoggedIn, logoutUser } from "../redux/userSlice";
import Button, { ButtonType } from "./Button";
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

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease-in-out;
  margin-bottom: 3rem;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledLogo = styled(Logo)``;

const TitleText = styled.h1``;

const OrText = styled.span`
  margin: 15px 0;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.grayLight};
`;

const ManageDeckButton = styled(Button)`
  margin-bottom: 10px;
`;

const LoginButton = ManageDeckButton;

const LogoutButton = styled(Button)`
  margin-top: 10px;
`;

interface Props {
  roomCode: string;
  setRoomCode: React.Dispatch<React.SetStateAction<string>>;
  setPromptName: React.Dispatch<React.SetStateAction<boolean>>;
}

const Landing: React.FC<Props> = function (props) {
  const { roomCode, setRoomCode, setPromptName } = props;

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);

  const history = useHistory();

  const doesUserExist = useAppSelector(getIsUserLoggedIn);
  const dispatch = useAppDispatch();

  const handleNewGameClick = () => {
    setRoomCode("");
    setPromptName(true);
  };

  const handleJoinGameClick = () => {
    if (roomCode.length === 0) {
      setErrorMsg("Please enter a room code!");
      return;
    }
    setIsJoiningRoom(true);
    axios
      .head(`${BACKEND_URL}/rooms/${roomCode}`)
      .then(() => {
        setPromptName(true);
      })
      .catch((err) => {
        const statusCode = err.response.status;
        if (statusCode == StatusCodes.NOT_FOUND) {
          setErrorMsg("Room does not exist!");
        } else {
          setErrorMsg("Unable to join room!");
        }
      })
      .finally(() => {
        setIsJoiningRoom(false);
      });
  };

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMsg) {
      setErrorMsg(null);
    }
    setRoomCode(e.target.value);
  };

  const navigateToLoginPage = () => {
    history.push("/login");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // TODO: Implement manage deck page
  const navigateToManageDeck = () => {
    history.push("/deck");
  };

  return (
    <Wrapper>
      <Brand>
        <StyledLogo />
        <TitleText>Who&rsquo;s Who?</TitleText>
      </Brand>
      {doesUserExist ? (
        <ManageDeckButton onClick={navigateToManageDeck} type={ButtonType.Host}>
          Manage Deck
        </ManageDeckButton>
      ) : (
        <LoginButton onClick={navigateToLoginPage} type={ButtonType.Host}>
          Login
        </LoginButton>
      )}
      <Button onClick={handleNewGameClick} type={ButtonType.Host}>
        New Game
      </Button>
      <OrText>or</OrText>
      <StyledInput
        inputType="text"
        $error={errorMsg != null}
        placeholder="Room Code"
        value={roomCode}
        onChange={handleRoomCodeChange}
      />
      <Button onClick={handleJoinGameClick} isLoading={isJoiningRoom}>
        Join Game
      </Button>
      {doesUserExist && (
        <LogoutButton onClick={handleLogout} type={ButtonType.Danger}>
          Logout
        </LogoutButton>
      )}
      <ErrorMessage>&nbsp;{errorMsg}&nbsp;</ErrorMessage>
    </Wrapper>
  );
};

export default Landing;
