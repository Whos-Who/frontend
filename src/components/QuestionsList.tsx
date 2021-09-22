import React from "react";
import styled from "styled-components";

import QuestionCard from "./QuestionCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
`;

interface Props {
  questions: Question[];
  handleChangeQuestion: (questionId: string) => (newQuestion: string) => void;
  handleDeleteQuestion: (questionId: string) => () => void;
}

const QuestionsList: React.FC<Props> = (props) => {
  const { questions, handleChangeQuestion, handleDeleteQuestion } = props;

  return (
    <Wrapper>
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question.question}
          handleChangeQuestion={handleChangeQuestion(question.id)}
          handleDeleteQuestion={handleDeleteQuestion(question.id)}
        />
      ))}
    </Wrapper>
  );
};

export default QuestionsList;
