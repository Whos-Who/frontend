import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  border: 0.5rem solid;
  border-color: ${(props) => props.theme.colors.white};
  border-radius: 5%;
  background-color: ${(props) => props.color};
  width: 10rem;
  height: 5rem;
  margin: 1rem auto;
`;

const Title = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 700;
`;

interface Props {
  title: string;
  color: string;
  navigateToDeckView: () => void;
}

const DeckCard: React.FC<Props> = (props) => {
  const { title, color, navigateToDeckView } = props;

  return (
    <Wrapper color={color} onClick={navigateToDeckView}>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default DeckCard;
