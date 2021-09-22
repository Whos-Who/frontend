import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/PrimaryLogo.svg";
import { BACKEND_URL } from "../constants";
import Button, { ButtonType } from "./Button";
import LandingFooter from "./LandingFooter";
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
  padding: 30px 30px 0px 30px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
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

interface Props {
  roomCode: string;
  setRoomCode: React.Dispatch<React.SetStateAction<string>>;
  setPromptName: React.Dispatch<React.SetStateAction<boolean>>;
}

const Landing: React.FC<Props> = function (props) {
  const { roomCode, setRoomCode, setPromptName } = props;

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);

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

  return (
    <Wrapper>
      <InnerWrapper>
        <Brand>
          <StyledLogo />
          <TitleText>Who&rsquo;s Who?</TitleText>
        </Brand>
        <Button onClick={handleNewGameClick} type={ButtonType.Host}>
          New Game
        </Button>
        <OrText>or</OrText>
        <StyledInput
          type="text"
          $error={errorMsg != null}
          placeholder="Room Code"
          value={roomCode}
          onChange={handleRoomCodeChange}
        />
        <Button onClick={handleJoinGameClick} isLoading={isJoiningRoom}>
          Join Game
        </Button>
        <ErrorMessage>&nbsp;{errorMsg}&nbsp;</ErrorMessage>
      </InnerWrapper>
      <LandingFooter />
    </Wrapper>
  );
};

export default Landing;
