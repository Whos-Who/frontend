import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled, { useTheme } from "styled-components";

import { ReactComponent as Chevron } from "../assets/ChevronRight.svg";
import { ReactComponent as Logo } from "../assets/PrimaryLogo.svg";
import { BACKEND_URL } from "../constants";
import { setDeckId } from "../redux/gameSetupSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUserToken } from "../redux/userSlice";
import DeckCard from "./DeckCard";
import Loader from "./Loader";
import { GameMain } from "./Styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 30px 0;
  text-align: center;
`;

const StyledLogo = styled(Logo)`
  width: 50px;
  height: 50px;
  z-index: 2;
`;

const NewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 30px 0 10px;

  h3 {
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: 700;
    color: ${(props) => props.theme.colors.black};
  }
`;

const ConsumeSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px 20px 40px;
`;

const SelectDeck: React.FC = function () {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const userToken = useAppSelector(getUserToken);
  const [loading, setLoading] = useState<boolean>(true);
  const [decks, setDecks] = useState<Deck[]>([]);

  const generateRandomColor = () => {
    const deckColors = [
      theme.colors.blue,
      theme.colors.emerald,
      theme.colors.terraCotta,
    ];

    return deckColors[Math.floor(Math.random() * deckColors.length)];
  };

  useEffect(() => {
    fetchUserDecks().then(() => setLoading(false));
  }, []);

  const fetchUserDecks = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": userToken ?? "",
    };
    const decksResponse = await axios.get(`${BACKEND_URL}/decks`, {
      headers,
    });
    setDecks(decksResponse.data);
  };

  const handleDeckClick = (deckId: string) => {
    dispatch(setDeckId({ deckId: deckId }));
  };

  const navigateBackToHome = () => {
    history.push("");
  };

  return (
    <Wrapper>
      <StyledLogo />
      <NewHeader>
        <Chevron onClick={navigateBackToHome} />
        <h3>Select a deck</h3>
        <ConsumeSpace />
      </NewHeader>
      <GameMain>
        {loading ? (
          <Loader />
        ) : (
          <List>
            {decks.map((deck) => (
              <DeckCard
                key={deck.id}
                title={deck.title}
                color={generateRandomColor()}
                onClick={() => handleDeckClick(deck.id)}
              />
            ))}
          </List>
        )}
      </GameMain>
    </Wrapper>
  );
};

export default SelectDeck;
