import React from "react";
import GameSDSHStore from "../stores/GameSDSHStore";
import CounterStore from "../stores/CounterStore";

export const storesContext = React.createContext({
  gameSDSHStore: new GameSDSHStore({}),
  counterStore: new CounterStore({}),
});
