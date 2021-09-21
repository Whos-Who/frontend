import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import DecksList from "../components/DecksList";
import { GameHeader, GameMain } from "../components/Styles";
import YourDecks from "../components/YourDecks";
import { BACKEND_URL } from "../constants";
import { useTrackPage } from "../hooks/GoogleAnalytics";
import { useAppSelector } from "../redux/hooks";
import { getUserToken } from "../redux/userSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const DecksHeader = styled(GameHeader)`
  padding: 10px 30px;
`;

const DecksMain = GameMain;

const Decks: React.FC = function () {
  const [decks, setDecks] = useState<Deck[]>([]);

  const userToken = useAppSelector(getUserToken);

  useTrackPage();

  useEffect(() => {
    fetchUserDecks();
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

  const createNewDeck = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": userToken ?? "",
    };
    const data = {
      title: "New Deck",
    };
    const createDeckResponse = await axios.post(`${BACKEND_URL}/decks`, data, {
      headers,
    });
    const newDecks = [...decks];
    newDecks.push(createDeckResponse.data);
    setDecks(newDecks);
  };

  return (
    <Wrapper>
      <DecksHeader>
        <YourDecks createNewDeck={createNewDeck} />
      </DecksHeader>
      <DecksMain>
        <DecksList decks={decks} />
      </DecksMain>
    </Wrapper>
  );
};

export default Decks;
