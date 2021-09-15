import React from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 30px;
  background: ${(props) => props.theme.colors.white};
`;

interface Props {
  isHost: boolean;
  handleStartClick: React.MouseEventHandler;
  handleLeaveClick: React.MouseEventHandler;
}

const DualStickyButtons: React.FC<Props> = (props) => {
  const { isHost, handleLeaveClick, handleStartClick } = props;

  return (
    <Wrapper>
      {isHost && (
        <Button onClick={handleStartClick} primary>
          Start
        </Button>
      )}
      <Button onClick={handleLeaveClick} danger>
        Leave
      </Button>
    </Wrapper>
  );
};

export default DualStickyButtons;
