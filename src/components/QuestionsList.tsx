import React from "react";
import styled from "styled-components";

import QuestionCard from "./QuestionCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`;

interface Props {
  questions: Question[];
  handleChangeQuestion: (questionId: string) => (newQuestion: string) => void;
}

const QuestionsList: React.FC<Props> = (props) => {
  const { questions, handleChangeQuestion } = props;

  return (
    <Wrapper>
      {questions.map((question) => {
        return (
          <QuestionCard
            key={question.id}
            question={question.question}
            handleChangeQuestion={handleChangeQuestion(question.id)}
          />
        );
      })}
    </Wrapper>
  );
};

export default QuestionsList;
