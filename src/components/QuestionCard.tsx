import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as Cross } from "../assets/SmallCross.svg";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextBox = styled.textarea<{ $hasCross: boolean }>`
  appereance: none;
  opacity: 1;
  resize: none;
  width: 100%;
  padding: 10px;
  ${(props) => props.$hasCross && `padding-right: 30px;`}
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

  :disabled {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }
`;

const StyledCross = styled(Cross)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

interface Props {
  isDefaultDeck: boolean;
  question: string;
  handleChangeQuestion: (newQuestion: string) => void;
  handleDeleteQuestion: () => void;
}

const QuestionCard: React.FC<Props> = (props) => {
  const {
    isDefaultDeck,
    question,
    handleChangeQuestion,
    handleDeleteQuestion,
  } = props;

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
        $hasCross={!isDefaultDeck}
        disabled={isDefaultDeck}
      />
      {!isDefaultDeck && <StyledCross onClick={handleDeleteQuestion} />}
    </Wrapper>
  );
};

export default QuestionCard;
