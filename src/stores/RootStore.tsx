import { configure } from "mobx";
import CounterStore from "./CounterStore";
import GameSDSHStore from "./GameSDSHStore";

// don't allow state modifications outside actions
configure({ enforceActions: "always" });

class RootStore {
  counterStore: any;
  gameSDSHStore: any;

  constructor() {
    this.counterStore = new CounterStore(this);
    this.gameSDSHStore = new GameSDSHStore(this);
  }
}

export default RootStore;

// https://mobx.js.org/best/store.html
