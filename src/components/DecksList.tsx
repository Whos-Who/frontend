import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

interface Props {
  decks: Deck[];
}

const DecksList: React.FC<Props> = (props) => {
  const { decks } = props;

  return (
    <Wrapper>
      {decks.map((entry) => {
        return <h1 key={entry.id}>{entry.title}</h1>;
      })}
    </Wrapper>
  );
};

export default DecksList;
