import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
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

const PlusButton = styled(AddIcon)`
  color: ${(props) => props.theme.colors.blue};
`;

interface Props {
  createNewDeck: () => void;
}

const YourDecks: React.FC<Props> = (props) => {
  const history = useHistory();
  const { createNewDeck } = props;

  const navigateBackToHome = () => {
    history.push("");
  };

  return (
    <Wrapper>
      <ArrowButton fontSize="small" onClick={navigateBackToHome} />
      <Title>Your Decks</Title>
      <PlusButton fontSize="medium" onClick={createNewDeck} />
    </Wrapper>
  );
};

export default YourDecks;
