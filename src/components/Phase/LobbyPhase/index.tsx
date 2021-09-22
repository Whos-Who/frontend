import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { MIN_PLAYERS } from "../../../constants";
import SocketContext from "../../../contexts/SocketContext";
import {
  addPlayer,
  removePlayer,
  resetGameState,
} from "../../../redux/gameStateSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { resetPlayerState, selectPlayerId } from "../../../redux/playerSlice";
import Button, { ButtonType } from "../../Button";
import { GameFooter, GameHeader, GameMain } from "../../Styles";
import PlayerList from "../components/PlayerList";
import RoomCode from "./components/RoomCode";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

const PhaseHeader = styled(GameHeader)`
  padding: 10px 30px;

  @media screen and (min-width: 600px) {
    border: 1px solid ${(props) => props.theme.colors.grayLighter};
    min-width: 600px;
    border-radius: 5px;
    width: auto;
    padding: 20px 30px;
  }
`;

const PhaseMain = styled(GameMain)`
  padding: 20px 30px;
`;

const LobbyPhase: React.FC = function () {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const socketContext = useContext(SocketContext);

  const playerId = useAppSelector(selectPlayerId);
  const {
    roomCode,
    host: hostId,
    players,
    playerCount,
  } = useAppSelector((state) => state.gameState);

  const isHost = hostId == playerId;

  useEffect(() => {
    const userJoinListener = (response: Sockets.UserJoinResponse) => {
      const { clientId, gameState } = response;
      dispatch(
        addPlayer({
          clientId: clientId,
          player: gameState.players[clientId],
        })
      );
    };
    const userLeaveListener = (response: Sockets.UserLeaveResponse) => {
      dispatch(removePlayer({ clientId: response.clientId }));
    };

    socketContext?.socket?.on("user-join", userJoinListener);
    socketContext?.socket?.on("user-leave", userLeaveListener);

    return () => {
      socketContext?.socket?.off("user-join", userJoinListener);
      socketContext?.socket?.off("user-leave", userLeaveListener);
    };
  }, [socketContext?.socket]);

  const handleStartClick = () => {
    console.log("start game");
    // TODO: add deckId as a param once deck selection is ready
    socketContext?.socket?.emit("game-start", {
      roomCode: roomCode,
    });
  };

  const handleLeaveClick = () => {
    if (window.confirm("Are you sure you want to leave?")) {
      socketContext?.socket?.emit("room-leave", { roomCode: roomCode });
      dispatch(resetGameState());
      dispatch(resetPlayerState());
      history.push("/");
    }
  };

  const isStartDisabled = playerCount < MIN_PLAYERS;

  return (
    <Wrapper>
      <PhaseHeader>
        <RoomCode id={roomCode} />
      </PhaseHeader>
      <PhaseMain>
        <PlayerList playerCount={playerCount} players={players} />
      </PhaseMain>
      <GameFooter>
        {isHost && (
          <Button
            onClick={handleStartClick}
            type={ButtonType.Host}
            isDisabled={isStartDisabled}
          >
            Start
            {isStartDisabled && ` (Minimum ${MIN_PLAYERS} players)`}
          </Button>
        )}
        <Button onClick={handleLeaveClick} type={ButtonType.Danger}>
          Leave
        </Button>
      </GameFooter>
    </Wrapper>
  );
};

export default LobbyPhase;
