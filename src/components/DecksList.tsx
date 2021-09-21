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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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

  const groupByRow = () => {
    const rows = [];
    for (let i = 0; i < decks.length; i += 2) {
      if (i !== decks.length - 1) {
        rows.push([decks[i], decks[i + 1]]);
      } else {
        rows.push([decks[i]]);
      }
    }
    return rows;
  };

  const navigateToDeckView = (id: string) => () => {
    history.push(`/decks/${id}`);
  };

  return (
    <Wrapper>
      {groupByRow().map((row, index) => {
        return (
          <Row key={index}>
            {row.map((deck) => {
              return (
                <DeckCard
                  key={deck.id}
                  title={deck.title}
                  color={generateRandomColor()}
                  navigateToDeckView={navigateToDeckView(deck.id)}
                />
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

export default DecksList;
