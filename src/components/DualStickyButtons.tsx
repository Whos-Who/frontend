import React from "react";
import styled from "styled-components";

import Button, { ButtonType } from "./Button";

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 30px 10px;
  border-top: 1px solid ${(props) => props.theme.colors.grayLighter};
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
        <Button onClick={handleStartClick} type={ButtonType.Host}>
          Start
        </Button>
      )}
      <Button onClick={handleLeaveClick} type={ButtonType.Danger}>
        Leave
      </Button>
    </Wrapper>
  );
};

export default DualStickyButtons;
