import React, { useEffect, useRef } from "react";
import GameSDSH from "../../components/GameSDSH";
import GameOver from "../../components/GameOver";
import { useGame } from "../../contexts/GameProvider";
import SubmitForm from "../../components/SubmitForm";

const GameSDSHPage: React.FC = () => {
  const game = useGame();
  const gameRef = useRef(game);
  gameRef.current = game;

  useEffect(() => {
    gameRef.current.gameStart();
  }, []);

  return (
    <>
      {game.isGameStarted ? <GameSDSH /> : null}
      {game.isUnlocked ? <SubmitForm /> : null}
      {game.isGameOver ? <GameOver /> : null}
    </>
  );
};

export default GameSDSHPage;
