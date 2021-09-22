import React from "react";
import { useHistory } from "react-router";
import styled, { useTheme } from "styled-components";

import DeckCard from "./DeckCard";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 20px 30px;
  text-align: center;
`;

interface Props {
  decks: Deck[];
}

const DecksList: React.FC<Props> = (props) => {
  const { decks } = props;
  const theme = useTheme();
  const history = useHistory();

  const generateRandomColor = () => {
    const deckColors = [
      theme.colors.blue,
      theme.colors.emerald,
      theme.colors.terraCotta,
    ];

    return deckColors[Math.floor(Math.random() * deckColors.length)];
  };

  const navigateToDeckView = (id: string) => () => {
    history.push(`/decks/${id}`);
  };

  return (
    <Wrapper>
      {decks.map((deck) => (
        <DeckCard
          key={deck.id}
          title={deck.title}
          color={generateRandomColor()}
          onClick={navigateToDeckView(deck.id)}
        />
      ))}
    </Wrapper>
  );
};

export default DecksList;
