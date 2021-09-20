import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Theme from "../styles/theme";
import DeckCard from "./DeckCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

interface Props {
  decks: Deck[];
}

const DecksList: React.FC<Props> = (props) => {
  const history = useHistory();
  const { decks } = props;

  const generateRandomColor = () => {
    const deckColors = [
      Theme.colors.blue,
      Theme.colors.rose,
      Theme.colors.emerald,
    ];

    return deckColors[Math.floor(Math.random() * deckColors.length)];
  };

  const navigateToDeckView = (id: string) => () => {
    history.push(`/decks/${id}`);
  };

  return (
    <Wrapper>
      {decks.map((deck) => {
        return (
          <DeckCard
            key={deck.id}
            title={deck.title}
            color={generateRandomColor()}
            navigateToDeckView={navigateToDeckView(deck.id)}
          />
        );
      })}
    </Wrapper>
  );
};

export default DecksList;
