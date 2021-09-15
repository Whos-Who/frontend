import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";

import SocketContext from "../../../contexts/SocketContext";
import { setGameState } from "../../../redux/gameStateSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectPlayerId } from "../../../redux/playerSlice";
import DualStickyButtons from "../../DualStickyButtons";
import PlayerList from "./PlayerList";
import RoomCode from "./RoomCode";

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
    <>
      <RoomCode id={id} />
      <PlayerList playerCount={playerCount} players={players} />
      <DualStickyButtons
        isHost={isHost}
        handleLeaveClick={handleLeaveClick}
        handleStartClick={handleStartClick}
      />
    </>
  );
};

export default Lobby;
