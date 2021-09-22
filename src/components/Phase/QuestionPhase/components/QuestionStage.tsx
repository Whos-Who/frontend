import React, { useContext, useState } from "react";
import styled from "styled-components";

import SocketContext from "../../../../contexts/SocketContext";
import { useAppSelector } from "../../../../redux/hooks";
import Button from "../../../Button";
import { GameFooter, GameHeader, GameMain } from "../../../Styles";
import { Question } from "../../Styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

const PhaseHeader = styled(GameHeader)`
  padding: 10px 30px;

  @media screen and (min-width: 600px) {
    border: 1px solid ${(props) => props.theme.colors.grayLighter};
    min-width: 600px;
    border-radius: 0 0 5px 5px;
    width: auto;
    padding: 20px 30px;
  }
`;

const Subheading = styled.h4`
  margin: 0 0 6px;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 700;
`;

const PhaseMain = styled(GameMain)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 20px;

  @media screen and (min-width: 600px) {
    max-width: 600px;
  }
`;

const AnswerBox = styled.textarea`
  resize: none;
  width: 100%;
  padding: 15px;
  border: 0;
  border: 1px solid ${(props) => props.theme.colors.grayLight};
  border-radius: 3px;
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.md};

  ::placeholder {
    color: ${(props) => props.theme.colors.grayLight};
  }
`;

const CharacterCount = styled.span`
  align-self: flex-end;
  color: ${(props) => props.theme.colors.grayDark};
`;

const QuestionStage: React.FC = function () {
  const socketContext = useContext(SocketContext);

  const { roomCode, currQuestion } = useAppSelector((state) => state.gameState);
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmitClick = () => {
    socketContext?.socket?.emit("game-player-answer-submission", {
      roomCode: roomCode,
      answer: answer,
    });
  };

  const isSubmitDisabled = answer.length === 0;

  return (
    <Wrapper>
      <PhaseHeader>
        <Subheading>Question Stage</Subheading>
        <Question>{currQuestion}</Question>
      </PhaseHeader>
      <PhaseMain>
        <AnswerBox
          rows={5}
          maxLength={200}
          placeholder="Your answer here..."
          value={answer}
          onChange={handleAnswerChange}
        />
        <CharacterCount>{answer.length}/200</CharacterCount>
      </PhaseMain>
      <GameFooter>
        <Button onClick={handleSubmitClick} isDisabled={isSubmitDisabled}>
          Submit
        </Button>
      </GameFooter>
    </Wrapper>
  );
};

export default QuestionStage;
