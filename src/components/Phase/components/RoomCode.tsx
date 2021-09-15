import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 30px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLighter};
  background: ${(props) => props.theme.colors.white};
  text-align: center;
`;

const Title = styled.h4`
  margin: 0 auto;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;

const RoomId = styled.h1`
  margin: 0 auto;
  font-size: ${(props) => props.theme.fontSizes.xxl};
  color: ${(props) => props.theme.colors.blue};
`;

interface Props {
  id: string;
}

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
