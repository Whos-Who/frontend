import React from "react";
import styled from "styled-components";

import QuestionCard from "./QuestionCard";

const Wrapper = styled.div<{ $isDefaultDeck: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
  ${(props) => props.$isDefaultDeck && `padding-bottom: 40px;`}
`;

interface Props {
  isDefaultDeck: boolean;
  questions: Question[];
  handleChangeQuestion: (questionId: string) => (newQuestion: string) => void;
  handleDeleteQuestion: (questionId: string) => () => void;
}

const QuestionsList: React.FC<Props> = (props) => {
  const {
    isDefaultDeck,
    questions,
    handleChangeQuestion,
    handleDeleteQuestion,
  } = props;

  return (
    <Wrapper $isDefaultDeck={isDefaultDeck}>
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          isDefaultDeck={isDefaultDeck}
          question={question.question}
          handleChangeQuestion={handleChangeQuestion(question.id)}
          handleDeleteQuestion={handleDeleteQuestion(question.id)}
        />
      ))}
    </Wrapper>
  );
};

export default QuestionsList;
