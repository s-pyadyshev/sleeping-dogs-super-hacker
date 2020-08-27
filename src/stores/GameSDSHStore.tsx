import { observable, action } from "mobx";
import { isEqual } from "lodash";

class GameSDSHStore {
  rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  // settings
  attemptsInitial = 6;

  @action
  generateSecretCode = () => {
    // Generate full secret code and shuffle it (no repeated digits)
    const allowedDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    function shuffle(a: any) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    this.code = shuffle(allowedDigits).slice(0, 4);
  };

  initialUserCodeState = [
    {
      value: 0,
      isExist: false,
      isValid: false,
    },
    {
      value: 0,
      isExist: false,
      isValid: false,
    },
    {
      value: 0,
      isExist: false,
      isValid: false,
    },
    {
      value: 0,
      isExist: false,
      isValid: false,
    },
  ];

  @observable
  code: any = [];

  @observable
  userCode: any = this.initialUserCodeState;

  @observable
  attempts: number = this.attemptsInitial;

  attemptsUsed: number = 0;

  // counter for submit form
  @observable
  counter = 0;

  @action
  decreaseAttempts() {
    this.attempts = this.attempts - 1;
  }

  @action
  calculateAttemptsUsed() {
    this.attemptsUsed = this.attemptsInitial - this.attempts;
  }

  @observable
  isUnlocked = false;

  @observable
  isGameOver = false;

  @observable
  isGameStarted = false;

  @action
  checkCodeValidity() {
    const buttonsIds = [0, 1, 2, 3];

    const userCodeArray = this.userCode.map((item: any) => item.value);
    const isEqualCodes = isEqual(this.code, userCodeArray) ? true : false;

    buttonsIds.map((id: number) => {
      const isUserValueExist = this.code.includes(this.userCode[id].value)
        ? true
        : false;

      const isUserValueValid =
        this.code[id] === this.userCode[id].value ? true : false;

      if (isEqualCodes) {
        this.userCode.map((code: any) => {
          code.isExist = true;
          code.isValid = true;
        });
        this.isUnlocked = true;
      } else if (isUserValueExist && !isUserValueValid) {
        this.userCode[id].isExist = true;
        this.userCode[id].isValid = false;
      } else if (isUserValueExist && isUserValueValid) {
        this.userCode[id].isExist = true;
        this.userCode[id].isValid = true;
      } else {
        this.userCode[id].isValid = false;
        this.userCode[id].isExist = false;
      }
    });
  }

  @action
  setCodeNumber(id: any, value: number) {
    this.userCode[id].value = value;
  }

  @action
  gameStart() {
    this.generateSecretCode();
    this.isGameStarted = true;
    this.attempts = this.attemptsInitial;
  }
}

export default GameSDSHStore;
