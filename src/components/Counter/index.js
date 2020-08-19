import React, { useEffect } from "react";
import { useStores } from "../../hooks/use-stores";

const Counter = () => {
  const { counterStore, gameSDSHStore } = useStores();

  useEffect(() => {
    return () => {
      gameSDSHStore.counter = counterStore.counter;

      if (!gameSDSHStore.isUnlocked) {
        counterStore.endCounter();
      }
    };
  }, []);
  return <h1>Time: {counterStore.counter}</h1>;
};

export default Counter;
