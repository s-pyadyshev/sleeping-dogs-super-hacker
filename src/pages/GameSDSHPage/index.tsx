import React, { useEffect } from "react";
import GameSDSH from "../../components/GameSDSH";
import GameOver from "../../components/GameOver";
import { useStores } from "../../hooks/use-stores";

export interface GameSDSHPageProps {}

const GameSDSHPage: React.SFC<GameSDSHPageProps> = () => {
  const { gameSDSHStore } = useStores();

  // useEffect(() => {
  //   gameSDSHStore.gameStart();
  // }, [gameSDSHStore]);

  return (
    <>
      {/* TODO Refactor conditions */}
      {gameSDSHStore.isGameStarted === true ? <GameSDSH /> : null}

      {gameSDSHStore.isGameOver === true &&
      gameSDSHStore.isGameStarted === false ? (
        <GameOver />
      ) : null}
    </>
  );
};

export default GameSDSH;
