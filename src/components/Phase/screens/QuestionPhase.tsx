import React, { useState } from "react";
import styled from "styled-components";

import { selectQuestion } from "../../../redux/gameStateSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Button from "../../Button";
import { GameFooter, GameHeader, GameMain } from "../../Styles";

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

const QuestionPhase: React.FC = function () {
  const dispatch = useAppDispatch();

  const question = useAppSelector(selectQuestion);
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmitClick = () => {
    // submit
  };

  const isSubmitDisabled = answer.length === 0;

  return (
    <Wrapper>
      <PhaseHeader>
        <Subheading>Question Stage</Subheading>
        {/* <Question>{question}</Question> */}
        <Question>If you could have a superpower, what would it be?</Question>
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

export default QuestionPhase;
