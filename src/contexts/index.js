import React from "react";
import GameSDSHStore from "../stores/GameSDSHStore";

export const storesContext = React.createContext({
  gameSDSHStore: new GameSDSHStore(),
});
