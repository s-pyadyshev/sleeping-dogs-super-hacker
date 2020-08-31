import { observable, action } from "mobx";
import { isEqual, initial } from "lodash";
import { shuffle } from "../utils";
import { UserCodeInterface } from "../interfaces/user-code";

class GameSDSHStore {
  rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  // settings
  allowedDigits: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  minValue: number = 0;
  maxValue: number = 9;
  attemptsInitial: number = 6;
  initialUserCodeState: UserCodeInterface[] = [
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
  codeLength = initial.length;

  @observable
  code: number[] = [];

  @observable
  userCode: any = this.initialUserCodeState;

  @observable
  attempts: number = this.attemptsInitial;

  attemptsUsed: number = 0;

  // counter for submit form
  @observable
  counter = 0;

  @observable
  isUnlocked = false;

  @observable
  isGameOver = false;

  @observable
  isGameStarted = false;

  // Generate full secret code, shuffle it (no repeated digits) and cut first 4 digits
  @action
  generateSecretCode = () => {
    this.code = shuffle(this.allowedDigits).slice(
      0,
      this.initialUserCodeState.length
    );
  };

  @action
  decreaseAttempts() {
    this.attempts = this.attempts - 1;
  }

  @action
  calculateAttemptsUsed() {
    this.attemptsUsed = this.attemptsInitial - this.attempts;
  }

  @action
  checkCodeValidity() {
    const buttonsIds = [0, 1, 2, 3]; // TODO constant

    const userCodeArray = this.userCode.map((item: any) => item.value);
    const isEqualCodes = isEqual(this.code, userCodeArray) ? true : false;

    buttonsIds.map((id: number) => {
      const isUserValueExist = this.code.includes(this.userCode[id].value)
        ? true
        : false;

      const isUserValueValid =
        this.code[id] === this.userCode[id].value ? true : false;

      if (isEqualCodes) {
        this.isGameStarted = false;
        this.isUnlocked = true;
        this.userCode.map((code: any) => {
          code.isExist = true;
          code.isValid = true;
          return null; // array-callback-return
        });
      } else if (isUserValueExist && !isUserValueValid) {
        // yellow
        this.userCode[id].isExist = true;
        this.userCode[id].isValid = false;
      } else if (isUserValueExist && isUserValueValid) {
        // green
        this.userCode[id].isExist = true;
        this.userCode[id].isValid = true;
      } else {
        this.userCode[id].isValid = false; // red
        this.userCode[id].isExist = false;
      }

      return null; // array-callback-return
    });
  }

  @action
  incrementCodeNumber(id: any) {
    if (this.userCode[id].value === this.maxValue) {
      this.userCode[id].value = 0;
    } else {
      this.userCode[id].value += 1;
    }
  }

  @action
  decrementCodeNumber(id: any) {
    if (this.userCode[id].value === this.minValue) {
      this.userCode[id].value = this.maxValue;
    } else {
      this.userCode[id].value -= 1;
    }
  }

  // state - gameStarted
  @action
  gameStart() {
    this.generateSecretCode();
    this.isGameOver = false;
    this.isUnlocked = false;
    this.isGameStarted = true;
    this.userCode = this.initialUserCodeState;
    this.attempts = this.attemptsInitial;
  }

  // @action
  // gameReset() {
  //   this.isGameStarted = false;
  //   this.isGameOver = false;
  //   this.isUnlocked = false;
  //   this.attempts = this.attemptsInitial;
  // }
}

export default GameSDSHStore;
