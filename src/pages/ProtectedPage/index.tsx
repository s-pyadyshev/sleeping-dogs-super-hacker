import React from "react";
import GameSDSH from "./components/GameSDSH";

const ProtectedPage = () => {
  return <GameSDSH currentUser={currentUser} />;
};

export default ProtectedPage;
