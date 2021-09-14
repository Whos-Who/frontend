import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import Button from "../components/Button";
import { trackPage } from "../components/GoogleAnalytics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setNameAndId } from "../redux/playerSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 30px;
`;

type RoomParams = {
  id: string;
};

const Room: React.FC = function () {
  const dispatch = useAppDispatch();
  const { player } = useAppSelector((state) => state);
  const { id } = useParams<RoomParams>();

  const [name, setName] = useState("");

  useEffect(() => {
    trackPage();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // TODO: validate name
  const handleNextClick = () => {
    dispatch(setNameAndId({ id: nanoid(), name: name }));
  };

  return (
    <Wrapper>
      Room code {id}
      {player.id == null ? (
        <>
          <input
            type="text"
            placeholder="Enter name"
            onChange={handleNameChange}
          />
          <Button onClick={handleNextClick}>Next</Button>
        </>
      ) : (
        <p>welcome {player.name}</p>
      )}
    </Wrapper>
  );
};

export default Room;