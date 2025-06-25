import { makeAutoObservable  } from "mobx";

class CounterStore {
  constructor() {
    makeAutoObservable(this);
  }

  counter: number = 0;
  counterInProgress: boolean = false;
  counterTimeout: ReturnType<typeof setTimeout> | null = null;

  startCounter() {
    this.counterInProgress = true;

    this.counterTimeout = setTimeout(() => {
      this.counter++;
    }, 1000);
  }

  endCounter() {
    if (this.counterTimeout !== null) {
      clearTimeout(this.counterTimeout);
    }
    this.counterInProgress = false;
    this.counter = 0;
  }
}

export default CounterStore;
