import { observable, action, decorate } from "mobx";

class CounterStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  counter = 0;
  counterInProgress = false;
  counterTimeout;

  startCounter() {
    this.counterInProgress = true;

    this.counterTimeout = setTimeout(() => {
      this.counter++;
    }, 1000);
  }

  endCounter() {
    clearTimeout(this.counterTimeout);
    this.counterInProgress = false;
    this.counter = 0;
  }
}

decorate(CounterStore, {
  counter: observable,
  counterInProgress: observable,
  startCounter: action,
  endCounter: action,
});

export default CounterStore;
