import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 140px;
  height: 190px;
  padding: 15px 10px;
  border: 4px solid ${(props) => props.theme.colors.white};
  border-radius: 10px;
  background-color: ${(props) => props.$color};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const Title = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 700;
  font-style: italic;
  text-transform: uppercase;
  overflow-wrap: break-word;
`;

interface Props {
  title: string;
  color: string;
  navigateToDeckView: () => void;
}

const DeckCard: React.FC<Props> = (props) => {
  const { title, color, navigateToDeckView } = props;

  return (
    <Wrapper $color={color} onClick={navigateToDeckView}>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default DeckCard;
