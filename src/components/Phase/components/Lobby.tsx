import React from "react";
import { useParams } from "react-router";

import { useAppSelector } from "../../../redux/hooks";

const Lobby: React.FC = function () {
  const { player } = useAppSelector((state) => state);
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      Room code {id}
      <p>welcome {player.name}</p>
    </div>
  );
};

export default Lobby;
