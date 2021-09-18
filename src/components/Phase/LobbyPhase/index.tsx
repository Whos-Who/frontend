import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { MIN_PLAYERS } from "../../../constants";
import { Phase } from "../../../constants/Phases";
import SocketContext from "../../../contexts/SocketContext";
import {
  addPlayer,
  removePlayer,
  resetGameState,
  setPhase,
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
  height: 100%;
  max-width: 600px;
`;

const PhaseHeader = styled(GameHeader)`
  padding: 10px 30px;
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
    // TODO: use this once we have default deck ready
    socketContext?.socket?.emit("game-start", {
      roomCode: roomCode,
    });
    // TODO: and remove this
    // dispatch(setPhase({ phase: Phase.QUESTION }));
  };

  const handleLeaveClick = () => {
    // TODO: replace window.confirm
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
            {isStartDisabled && ` (At least ${MIN_PLAYERS} required)`}
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
