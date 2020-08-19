import { configure } from "mobx";

// don't allow state modifications outside actions
configure({ enforceActions: "always" });

class RootStore {
  constructor() {
    this.counterStore = new CounterStore(this);
    this.gameSDSHStore = new GameSDSHStore(this);
  }
}

export default RootStore;

// https://mobx.js.org/best/store.html
