import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const TotalPlayers = styled.h3`
  margin: 0 0 10px;
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.black};
`;

const DisplayPlayer = styled.h3<{
  $lowOpacity?: boolean;
  $isConnected: boolean;
}>`
  margin: 10px 0 0;
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) =>
    props.$isConnected
      ? props.theme.colors.blue
      : props.theme.colors.terraCotta};
  ${(props) => props.$lowOpacity && `opacity: 30%`};
`;

interface Props {
  readyCount?: number;
  playerCount: number;
  players: Record<string, PlayerState>;
}

const PlayerList: React.FC<Props> = (props) => {
  const { readyCount, playerCount, players } = props;

  const showReady = readyCount != null;

  return (
    <Wrapper>
      <TotalPlayers>
        {showReady
          ? `Ready (${readyCount}/${playerCount})`
          : `Players (${playerCount})`}
      </TotalPlayers>
      {Object.entries(players).map(([playerId, player]) => (
        <DisplayPlayer
          key={playerId}
          $lowOpacity={
            (showReady && players[playerId].currAnswer.value === "") ||
            !player.connected
          }
          $isConnected={player.connected}
        >
          {player.username}
        </DisplayPlayer>
      ))}
    </Wrapper>
  );
};

export default PlayerList;
