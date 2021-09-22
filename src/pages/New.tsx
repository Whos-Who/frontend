import React from "react";

import SelectDeck from "../components/SelectDeck";
import SetName from "../components/SetName";
import { useAppSelector } from "../redux/hooks";

const New: React.FC = function () {
  const { deckId } = useAppSelector((state) => state.gameSetup);

  if (deckId != null) {
    return <SetName />;
  }

  return <SelectDeck />;
};

export default New;
