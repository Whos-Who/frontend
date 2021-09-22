import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ReactComponent as Chevron } from "../assets/ChevronRight.svg";
import { GameHeader } from "./Styles";

const Header = styled(GameHeader)`
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

interface Props {
  isDefaultDeck: boolean;
}

const EditDeckHeader: React.FC<Props> = function (props) {
  const { isDefaultDeck } = props;
  const history = useHistory();

  const navigateBackToDecks = () => {
    history.push("/decks");
  };

  return (
    <Header>
      <Chevron onClick={navigateBackToDecks} />
      <h4>{isDefaultDeck ? "View" : "Edit"} Deck</h4>
      <ConsumeSpace />
    </Header>
  );
};

export default EditDeckHeader;
