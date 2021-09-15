import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const TotalPlayers = styled.h3`
  margin: 0 auto;
  color: ${(props) => props.theme.colors.black};
`;

const DisplayPlayer = styled.h4`
  margin: 1rem auto;
  color: ${(props) => props.theme.colors.blue};
`;

interface Props {
  playerCount: number;
  players: Record<string, PlayerState>;
}

const PlayerList: React.FC<Props> = (props) => {
  const { playerCount, players } = props;
  return (
    <Wrapper>
      <TotalPlayers>Players ({playerCount})</TotalPlayers>
      {Object.entries(players).map(([playerId, player]) => (
        <DisplayPlayer key={playerId}>{player.username}</DisplayPlayer>
      ))}
    </Wrapper>
  );
};

export default PlayerList;
