import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
  text-align: center;
`;

const TotalPlayers = styled.h3`
  margin: 0 0 10px;
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;

const DisplayPlayer = styled.h3`
  margin: 10px 0 0;
  font-size: ${(props) => props.theme.fontSizes.xl};
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
