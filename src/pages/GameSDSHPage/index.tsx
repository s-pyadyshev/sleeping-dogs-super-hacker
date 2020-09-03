import React, { useEffect } from "react";
import { observer } from "mobx-react";
import GameSDSH from "../../components/GameSDSH";
import GameOver from "../../components/GameOver";
import { useStores } from "../../hooks/use-stores";
import SubmitForm from "../../components/SubmitForm";

const GameSDSHPage: React.SFC = observer(() => {
  const { gameSDSHStore } = useStores();

  useEffect(() => {
    gameSDSHStore.gameStart();
  }, [gameSDSHStore]);

  return (
    <>
      {/* TODO Refactor conditions */}
      {gameSDSHStore.isGameStarted === true ? <GameSDSH /> : null}
      {gameSDSHStore.isUnlocked === true ? <SubmitForm /> : null}
      {gameSDSHStore.isGameOver === true ? <GameOver /> : null}
    </>
  );
});

export default GameSDSHPage;
