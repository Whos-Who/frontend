import React, { useContext } from "react";
import styled from "styled-components";

import { MIN_PLAYERS } from "../../../../constants";
import SocketContext from "../../../../contexts/SocketContext";
import { useAppSelector } from "../../../../redux/hooks";
import { selectPlayerId } from "../../../../redux/playerSlice";
import Button, { ButtonType } from "../../../Button";
import {
  GameFooter,
  GameHeader,
  GameMain,
  WaitingMessage,
} from "../../../Styles";
import PlayerList from "../../components/PlayerList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
`;

const PhaseHeader = styled(GameHeader)`
  padding: 10px 20px;
`;

const Subheading = styled.h4`
  margin: 0 0 6px;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 700;
`;

const Question = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.blue};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 700;
`;

const PhaseMain = styled(GameMain)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const WaitingStage: React.FC = function () {
  const socketContext = useContext(SocketContext);

  const playerId = useAppSelector(selectPlayerId);
  const {
    roomCode,
    host: hostId,
    currQuestion,
    players,
    playerCount,
  } = useAppSelector((state) => state.gameState);

  const isHost = hostId == playerId;

  const readyCount = Object.values(players)
    .map((player): number => (player.currAnswer.value != "" ? 1 : 0))
    .reduce((a, b) => a + b, 0);

  const handleStartClick = () => {
    // TODO: use this once we have default deck ready
    // socketContext?.socket?.emit("game-next-turn", {
    //   roomCode: roomCode,
    // });
    // TODO: and remove this
    console.log("go to turn guess phase");
  };

  const isStartDisabled = readyCount < MIN_PLAYERS;

  return (
    <Wrapper>
      <PhaseHeader>
        <Subheading>Waiting for others...</Subheading>
        {/* <Question>{currQuestion}</Question> */}
        <Question>If you could have a superpower, what would it be?</Question>
      </PhaseHeader>
      <PhaseMain>
        <PlayerList
          readyCount={readyCount}
          playerCount={playerCount}
          players={players}
        />
      </PhaseMain>
      <GameFooter>
        {isHost ? (
          <Button
            type={ButtonType.Host}
            onClick={handleStartClick}
            isDisabled={isStartDisabled}
          >
            Start
          </Button>
        ) : (
          <WaitingMessage>Waiting for host to start game...</WaitingMessage>
        )}
      </GameFooter>
    </Wrapper>
  );
};

export default WaitingStage;
