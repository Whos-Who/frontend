import React from "react";
import styled from "styled-components";

const TextBox = styled.textarea`
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

interface Props {
  question: string;
  handleChangeQuestion: (newQuestion: string) => void;
}

const QuestionCard: React.FC<Props> = (props) => {
  const { question, handleChangeQuestion } = props;

  const handleChangeCurrentQuestion = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleChangeQuestion(e.target.value);
  };

  return (
    <TextBox
      rows={1}
      value={question}
      maxLength={200}
      onChange={handleChangeCurrentQuestion}
    />
  );
};

export default QuestionCard;
