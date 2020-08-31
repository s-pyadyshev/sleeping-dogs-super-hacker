import React from "react";
import { useStores } from "../../hooks/use-stores";
import "./style.scss";

const GameOver = () => {
  const { gameSDSHStore } = useStores();

  return (
    <div className="form-code">
      <div className="form-code__game-over">
        <h2>Game Over</h2>
        <h3>Your unlucky number is: {gameSDSHStore.code}</h3>
      </div>
    </div>
  );
};

export default GameOver;
