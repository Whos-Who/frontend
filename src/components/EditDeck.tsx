import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  text-align: center;
`;

const Title = styled.h4`
  margin: 0 auto;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;

const ArrowButton = styled(ArrowBackIosIcon)`
  color: ${(props) => props.theme.colors.blue};
`;

const ConsumeSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const EditDeck: React.FC = () => {
  const history = useHistory();

  const navigateBackToDecks = () => {
    history.push("/decks");
  };

  return (
    <Wrapper>
      <ArrowButton fontSize="small" onClick={navigateBackToDecks} />
      <Title>Edit Deck</Title>
      <ConsumeSpace />
    </Wrapper>
  );
};

export default EditDeck;
