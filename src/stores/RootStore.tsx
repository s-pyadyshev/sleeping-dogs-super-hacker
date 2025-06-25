import { configure } from "mobx";
import CounterStore from "./CounterStore";
import GameSDSHStore from "./GameSDSHStore";

// don't allow state modifications outside actions
configure({ enforceActions: "always" });

class RootStore {
  counterStore: CounterStore;
  gameSDSHStore: GameSDSHStore;

  constructor() {
    this.counterStore = new CounterStore();
    this.gameSDSHStore = new GameSDSHStore();
  }
}

export default RootStore;

// https://mobx.js.org/best/store.html
