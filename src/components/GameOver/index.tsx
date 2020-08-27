import React from "react";
import { useStores } from "../../hooks/use-stores";

const GameOver = () => {
  const { gameSDSHStore } = useStores();

  return (
    <div>
      <h2>Game Over</h2>
      <h3>Your unlucky number is: {gameSDSHStore.code}</h3>
    </div>
  );
};

export default GameOver;
