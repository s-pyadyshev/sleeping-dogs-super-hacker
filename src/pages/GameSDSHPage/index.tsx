import React, { useEffect } from "react";
import { observer } from "mobx-react";
import GameSDSH from "../../components/GameSDSH";
import GameOver from "../../components/GameOver";
import { useStores } from "../../hooks/use-stores";
import SubmitForm from "../../components/SubmitForm";

const GameSDSHPage: React.FC = observer(() => {
  const { gameSDSHStore } = useStores();

  useEffect(() => {
    gameSDSHStore.gameStart();
  }, [gameSDSHStore]);

  return (
    <>
      {gameSDSHStore.isGameStarted ? <GameSDSH /> : null}
      {gameSDSHStore.isUnlocked ? <SubmitForm /> : null}
      {gameSDSHStore.isGameOver ? <GameOver /> : null}
    </>
  );
});

export default GameSDSHPage;
