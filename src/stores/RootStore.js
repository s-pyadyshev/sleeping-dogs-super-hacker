class RootStore {
  constructor() {
    // this.userStore = new UserStore(this);
    this.todoStore = new GameSDSHStore(this);
  }
}

export default RootStore;
