import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: row;
  text-align: center;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.blue};
`;

interface Props {
  title: string;
}

const EditDeck: React.FC<Props> = (props) => {
  const { title } = props;

  return (
    <Wrapper>
      <p>Deck Name</p>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default EditDeck;
