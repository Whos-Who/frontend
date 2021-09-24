import React from "react";
import styled from "styled-components";

import { SectionHeading } from "../../Styles";

const Container = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.grayLighter};
  padding: 20px 30px;

  ${SectionHeading} {
    margin: 0 0 15px;
  }
`;

const Player = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLight};
`;

const PlayerInfo = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.lg};
`;

const Username = styled(PlayerInfo)`
  color: ${(props) => props.theme.colors.blue};
`;

const Score = styled(PlayerInfo)`
  color: ${(props) => props.theme.colors.black};
`;

interface Props {
  players: Record<string, PlayerState>;
}

const Standings: React.FC<Props> = function (props) {
  const { players } = props;

  const playersByScore = Object.values(players)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <Container>
      <SectionHeading>Current standings</SectionHeading>
      {playersByScore.map((player) => (
        <Player key={player.username}>
          <Username>{player.username}</Username>
          <Score>{player.score}</Score>
        </Player>
      ))}
    </Container>
  );
};

export default Standings;
