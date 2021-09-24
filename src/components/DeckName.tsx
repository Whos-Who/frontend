import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLighter};
  opacity: 1;
`;

const Label = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

const Title = styled.input`
  flex-grow: 1;
  margin: 0;
  padding: 0;
  background: none;
  color: ${(props) => props.theme.colors.blue};
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  text-transform: uppercase;
  resize: none;
  outline: none;
  border: none;
  opacity: 1;
`;

interface Props {
  title: string;
  handleChangeDeckName: React.ChangeEventHandler;
  isDefaultDeck: boolean;
}

const DeckName: React.FC<Props> = (props) => {
  const { title, handleChangeDeckName, isDefaultDeck } = props;

  return (
    <Wrapper>
      <Label>Deck Name</Label>
      <Title
        type="text"
        maxLength={20}
        value={title}
        onChange={handleChangeDeckName}
        disabled={isDefaultDeck}
      />
    </Wrapper>
  );
};

export default DeckName;
