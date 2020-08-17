import { observable, action, decorate } from "mobx";

class CounterStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  counter = 0;
  counterInProgress = false;
  counterTimeout;

  startCounter() {
    this.counterInProgress = !this.counterInProgress;

    this.counterTimeout = setTimeout(() => {
      this.counter++;
    }, 1000);
  }

  endCounter() {
    clearTimeout(this.counterTimeout);
    this.counterInProgress = !this.counterInProgress;
  }
}

decorate(CounterStore, {
  counter: observable,
  counterInProgress: observable,
  startCounter: action,
  endCounter: action,
});

export default CounterStore;
