import React, { useState } from "react";

import Landing from "../components/Landing";
import SetName from "../components/SetName";
import { useTrackPage } from "../hooks/GoogleAnalytics";

const Home: React.FC = function () {
  const [promptName, setPromptName] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>("");

  useTrackPage();

  if (promptName) {
    return <SetName roomCode={roomCode} />;
  }

  return (
    <Landing
      roomCode={roomCode}
      setRoomCode={setRoomCode}
      setPromptName={setPromptName}
    />
  );
};

export default Home;
