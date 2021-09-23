import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const TotalConnectedPlayers = styled.h3`
  margin: 0 0 10px;
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.black};
`;

const TotalDisconnectedPlayers = styled(TotalConnectedPlayers)`
  margin: 20px 0 10px 0;
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
  disconnectedPlayersCount: number;
  connectedPlayersCount: number;
  connectedPlayers: Record<string, PlayerState>;
  disconnectedPlayers: Record<string, PlayerState>;
}

const PlayerList: React.FC<Props> = (props) => {
  const {
    readyCount,
    disconnectedPlayersCount,
    connectedPlayersCount,
    connectedPlayers,
    disconnectedPlayers,
  } = props;

  const showReady = readyCount != null;

  return (
    <Wrapper>
      <TotalConnectedPlayers>
        {showReady
          ? `Ready (${readyCount}/${connectedPlayersCount})`
          : `Players (${connectedPlayersCount})`}
      </TotalConnectedPlayers>
      {Object.entries(connectedPlayers).map(([playerId, player]) => (
        <DisplayPlayer
          key={playerId}
          $lowOpacity={
            showReady && connectedPlayers[playerId].currAnswer.value === ""
          }
          $isConnected={true}
        >
          {player.username}
        </DisplayPlayer>
      ))}
      {disconnectedPlayersCount > 0 && (
        <TotalDisconnectedPlayers>
          Disconnected Players ({disconnectedPlayersCount})
        </TotalDisconnectedPlayers>
      )}
      {Object.entries(disconnectedPlayers).map(([playerId, player]) => (
        <DisplayPlayer key={playerId} $lowOpacity={true} $isConnected={false}>
          {player.username}
        </DisplayPlayer>
      ))}
    </Wrapper>
  );
};

export default PlayerList;
