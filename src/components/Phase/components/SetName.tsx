import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { Phase } from "../../../constants/Phases";
import { setPhase } from "../../../redux/gameStateSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { setNameAndId } from "../../../redux/playerSlice";
import Button from "../../Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 30px;
`;

const SetName: React.FC = function () {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // TODO: validate name
  const handleNextClick = () => {
    dispatch(setNameAndId({ id: nanoid(), name: name }));
    dispatch(setPhase({ phase: Phase.LOBBY }));
  };

  return (
    <Wrapper>
      Room code {id}
      <input type="text" placeholder="Enter name" onChange={handleNameChange} />
      <Button onClick={handleNextClick}>Next</Button>
    </Wrapper>
  );
};

export default SetName;
