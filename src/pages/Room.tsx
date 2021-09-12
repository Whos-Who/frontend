import React from "react";
import { useParams } from "react-router";

type RoomParams = {
  id: string;
};

const Room: React.FC = function () {
  const { id } = useParams<RoomParams>();

  return <div>Room code {id}</div>;
};

export default Room;
