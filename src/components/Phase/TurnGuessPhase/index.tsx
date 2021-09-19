import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../../redux/hooks";
import { selectPlayerId } from "../../../redux/playerSlice";
import { GameHeader } from "../../Styles";
import PhaseHeading from "../components/PhaseHeading";
import Timer from "../components/Timer";
import { Question } from "../Styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
`;

const PhaseHeader = styled(GameHeader)`
  position: relative;
`;

const StyledQuestion = styled(Question)`
  margin: 10px 95px 10px 20px;
`;

const TurnGuessPhase: React.FC = function () {
  const {
    currQuestion,
    currAnswerer: currAnswererId,
    players,
  } = useAppSelector((state) => state.gameState);

  const playerId = useAppSelector(selectPlayerId);

  return (
    <Wrapper>
      <PhaseHeader>
        <PhaseHeading currAnswererId={currAnswererId} playerId={playerId}>
          {players[currAnswererId].username}&apos;s turn
        </PhaseHeading>
        <StyledQuestion $isBlack>{currQuestion}</StyledQuestion>
        <Timer seconds={30} />
      </PhaseHeader>
      turn guess
    </Wrapper>
  );
};

export default TurnGuessPhase;
