import React from "react";
import styled from "styled-components";

interface Props {
  id: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 30px;
  background: ${(props) => props.theme.colors.white};
`;

const Title = styled.h4`
  margin: 0 auto;
`;

const RoomId = styled.h1`
  margin: 0 auto;
  color: ${(props) => props.theme.colors.blue};
`;

const RoomCode: React.FC<Props> = (props) => {
  const { id } = props;
  return (
    <Wrapper>
      <Title>Room code</Title>
      <RoomId>{id}</RoomId>
    </Wrapper>
  );
};

export default RoomCode;
