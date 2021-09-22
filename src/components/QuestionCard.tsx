import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as Cross } from "../assets/SmallCross.svg";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextBox = styled.textarea`
  resize: none;
  width: 100%;
  padding: 10px 30px 10px 10px;
  border: 1px solid ${(props) => props.theme.colors.grayLight};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  ::placeholder {
    color: ${(props) => props.theme.colors.grayLight};
  }
`;

const StyledCross = styled(Cross)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

interface Props {
  question: string;
  handleChangeQuestion: (newQuestion: string) => void;
  handleDeleteQuestion: () => void;
}

const QuestionCard: React.FC<Props> = (props) => {
  const { question, handleChangeQuestion, handleDeleteQuestion } = props;

  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref.current == null) {
      return;
    }
    ref.current.style.height = "0px";
    const scrollHeight = ref.current.scrollHeight;
    ref.current.style.height = scrollHeight + "px";
  }, [question]);

  const handleChangeCurrentQuestion = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleChangeQuestion(e.target.value);
  };

  return (
    <Wrapper>
      <TextBox
        ref={ref}
        rows={1}
        value={question}
        maxLength={150}
        onChange={handleChangeCurrentQuestion}
      />
      <StyledCross onClick={handleDeleteQuestion} />
    </Wrapper>
  );
};

export default QuestionCard;
