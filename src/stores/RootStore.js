class RootStore {
  constructor() {
    this.counterStore = new CounterStore(this);
    this.gameSDSHStore = new GameSDSHStore(this);
  }
}

export default RootStore;

// https://mobx.js.org/best/store.html
