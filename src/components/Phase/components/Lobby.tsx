import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";

import SocketContext from "../../../contexts/SocketContext";
import { setGameState } from "../../../redux/gameStateSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectPlayerId } from "../../../redux/playerSlice";
import DualStickyButtons from "../../DualStickyButtons";
import PlayerList from "./PlayerList";
import RoomCode from "./RoomCode";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
`;

const MainContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const Lobby: React.FC = function () {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const socketContext = useContext(SocketContext);

  const { id } = useParams<{ id: string }>();
  const playerId = useAppSelector(selectPlayerId);
  const {
    roomCode,
    host: hostId,
    players,
    playerCount,
  } = useAppSelector((state) => state.gameState);

  const isHost = hostId == playerId;

  useEffect(() => {
    const usersChangedListener = (gameState: GameState) => {
      dispatch(setGameState(gameState));
    };

    socketContext?.socket?.on("user-join", usersChangedListener);
    socketContext?.socket?.on("user-leave", usersChangedListener);

    return () => {
      socketContext?.socket?.off("user-join", usersChangedListener);
      socketContext?.socket?.off("user-leave", usersChangedListener);
    };
  }, [socketContext?.socket]);

  // TODO: validate at least 3 players
  const handleStartClick = () => {
    console.log("start game");
  };

  const handleLeaveClick = () => {
    // TODO: replace window.confirm
    if (window.confirm("Are you sure you want to leave?")) {
      socketContext?.socket?.emit("room-leave", { roomCode: roomCode });
      history.push("/");
    }
  };

  return (
    <Wrapper>
      <RoomCode id={id} />
      <MainContent>
        <PlayerList playerCount={playerCount} players={players} />
      </MainContent>
      <DualStickyButtons
        isHost={isHost}
        handleLeaveClick={handleLeaveClick}
        handleStartClick={handleStartClick}
      />
    </Wrapper>
  );
};

export default Lobby;
