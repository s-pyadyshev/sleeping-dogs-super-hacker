import { makeAutoObservable  } from "mobx";

class CounterStore {
  constructor() {
    makeAutoObservable(this);
  }

  counter: number = 0;
  counterInProgress: boolean = false;
  counterTimeout: number | ReturnType<typeof setTimeout> = 0;

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

export default CounterStore;
