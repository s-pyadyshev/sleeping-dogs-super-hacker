import { observable, action, makeObservable } from "mobx";
import { shuffleCutCode } from "../utils";
import { UserCodeInterface } from "../interfaces/user-code";
import { ALLOWED_DIGITS } from "../constants";
import { dec, equals } from "ramda";
import { cond, T } from "ramda";

const minValue: number = 0;
const maxValue: number = 9;

class GameSDSHStore {
  rootStore: any;

  constructor(rootStore: any) {
    makeObservable(this, {
      code: observable,
      userCode: observable,
      attempts: observable,
      counter: observable,
      isUnlocked: observable,
      isGameOver: observable,
      isGameStarted: observable,
      wins: observable,
      lost: observable,
      generateSecretCode: action,
      decreaseAttempts: action,
      calculateAttemptsUsed: action,
      checkCodeValidity: action,
      incrementCodeNumber: action,
      decrementCodeNumber: action,
      gameStart: action,
    });

    this.rootStore = rootStore;
  }

  // settings
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

  code: number[] = [];

  userCode: any = this.initialUserCodeState;

  attempts: number = this.attemptsInitial;

  attemptsUsed: number = 0;

  // counter for submit form
  counter: number = 0;

  isUnlocked: boolean = false;

  isGameOver: boolean = false;

  isGameStarted: boolean = false;

  wins: number = 0;

  lost: number = 0;

  // Generate full secret code, shuffle it (no repeated digits) and cut first 4 digits
  generateSecretCode() {
    this.code = shuffleCutCode(
      ALLOWED_DIGITS,
      this.initialUserCodeState.length
    );
  }

  decreaseAttempts() {
    this.attempts = dec(this.attempts);
  }

  calculateAttemptsUsed() {
    this.attemptsUsed = this.attemptsInitial - this.attempts;
  }

  checkCodeValidity() {
    const buttonsIds = [0, 1, 2, 3];
    const userCodeArray = this.userCode.map(
      (item: { value: number }) => item.value
    );
    const isEqualCodes = equals(this.code, userCodeArray);

    const setGameUnlocked = () => {
      this.isGameStarted = false;
      this.isUnlocked = true;
      this.userCode.map((code: UserCodeInterface) => {
        code.isExist = true;
        code.isValid = true;
        return null; // array-callback-return
      });
    };

    buttonsIds.map((id: number) => {
      const isUserValueExist = this.code.includes(this.userCode[id].value);
      const isUserValueValid = this.code[id] === this.userCode[id].value;

      const setPartialValidPlacement = () => {
        this.userCode[id].isExist = true;
        this.userCode[id].isValid = false;
      };

      const setValidPlacement = () => {
        this.userCode[id].isExist = true;
        this.userCode[id].isValid = true;
      };

      const setInvalidPlacement = () => {
        this.userCode[id].isValid = false;
        this.userCode[id].isExist = false;
      };

      const setDigitStates = cond([
        [() => isEqualCodes, setGameUnlocked],
        [() => isUserValueExist && !isUserValueValid, setPartialValidPlacement],
        [() => isUserValueExist && isUserValueValid, setValidPlacement],
        [T, setInvalidPlacement],
      ]);

      setDigitStates();

      return null; // array-callback-return
    });
  }

  incrementCodeNumber(id: number) {
    if (this.userCode[id].value === maxValue) {
      this.userCode[id].value = 0;
    } else {
      this.userCode[id].value += 1;
    }
  }

  decrementCodeNumber(id: number) {
    if (this.userCode[id].value === minValue) {
      this.userCode[id].value = maxValue;
    } else {
      this.userCode[id].value -= 1;
    }
  }

  // state - gameStarted
  gameStart() {
    this.generateSecretCode();
    this.isGameOver = false;
    this.isUnlocked = false;
    this.isGameStarted = true;
    this.userCode = this.initialUserCodeState;
    this.attempts = this.attemptsInitial;
  }
}

export default GameSDSHStore;
