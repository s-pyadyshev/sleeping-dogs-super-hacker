import React, { useEffect } from "react";
import { useStores } from "../../hooks/use-stores";
import "./style.scss";

const Counter = () => {
  const { counterStore, gameSDSHStore } = useStores();

  useEffect(() => {
    return () => {
      gameSDSHStore.counter = counterStore.counter;

      if (!gameSDSHStore.isUnlocked) {
        counterStore.endCounter();
      }
    };
  }, [counterStore, gameSDSHStore]);

  return (
    <span className="counter">
      Time: <span className="counter__value">{counterStore.counter}</span>
    </span>
  );
};

export default Counter;
