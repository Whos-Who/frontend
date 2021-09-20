import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: row;
  text-align: center;
`;

const Title = styled.textarea`
  color: ${(props) => props.theme.colors.blue};
  outline: none;
  border: none;
  height: 3rem;
  padding-top: 0.7rem;
  margin: auto 0;
  background: transparent;
  font-size: larger;
  resize: none;
  max-width: 60%;
`;

interface Props {
  title: string;
  handleChangeDeckName: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditDeck: React.FC<Props> = (props) => {
  const { title, handleChangeDeckName } = props;

  return (
    <Wrapper>
      <p>Deck Name</p>
      <Title
        rows={1}
        maxLength={20}
        value={title}
        onChange={handleChangeDeckName}
      />
    </Wrapper>
  );
};

export default EditDeck;
