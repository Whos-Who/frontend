import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ReactComponent as Chevron } from "../assets/ChevronRight.svg";
import { ReactComponent as Plus } from "../assets/Plus.svg";
import DecksList from "../components/DecksList";
import { GameHeader, GameMain, Loading } from "../components/Styles";
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
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;

  h4 {
    margin: 0 auto;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 700;
    color: ${(props) => props.theme.colors.black};
  }
`;

const DecksMain = GameMain;

const Decks: React.FC = function () {
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(true);
  const [decks, setDecks] = useState<Deck[]>([]);

  const userToken = useAppSelector(getUserToken);

  useTrackPage();

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
    history.push(`/decks/${createDeckResponse.data.id}`);
  };

  const navigateBackToHome = () => {
    history.push("");
  };

  return (
    <Wrapper>
      <DecksHeader>
        <Chevron onClick={navigateBackToHome} />
        <h4>Your Decks</h4>
        <Plus onClick={createNewDeck} />
      </DecksHeader>
      <DecksMain>
        {loading ? <Loading>Loading...</Loading> : <DecksList decks={decks} />}
      </DecksMain>
    </Wrapper>
  );
};

export default Decks;
