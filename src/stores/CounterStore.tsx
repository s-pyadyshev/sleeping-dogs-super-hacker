import { observable, action, decorate } from "mobx";

class CounterStore {
  rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  counter: number = 0;
  counterInProgress: boolean = false;
  counterTimeout: any;

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
