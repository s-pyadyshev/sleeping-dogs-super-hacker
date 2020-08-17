import { observable, action, decorate } from "mobx";
import { isEqual } from "lodash";

// Generate full secret code and shuffle it (no repeated digits)
const allowedDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const shuffledSecretCodeFull = shuffle(allowedDigits);

class GameSDSHStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  generateSecretCode = () => {
    this.code = [
      shuffledSecretCodeFull[0],
      shuffledSecretCodeFull[1],
      shuffledSecretCodeFull[2],
      shuffledSecretCodeFull[3],
    ];
  };

  code = [];

  userCode = [
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

  codeClasses = [];

  isUnlocked = false;

  checkNumberValidity(id, value) {
    const userCodeArray = this.userCode.map((item) => item.value);

    const isEqualCodes = isEqual(this.code, userCodeArray) ? true : false;

    const isUserValueExist = this.code.includes(value) ? true : false;

    const isUserValueValid = this.code[id] === value ? true : false;

    if (isEqualCodes) {
      this.userCode[id].isValid = !this.userCode[id].isValid;
      this.isUnlocked = !this.isUnlocked;
    } else if (isUserValueExist && !isUserValueValid) {
      this.userCode[id].isExist = true;
    } else if (isUserValueValid) {
      this.userCode[id].isValid = true;
    } else {
      this.userCode[id].isValid = false;
      this.userCode[id].isExist = false;
    }
  }

  setCodeNumber(id, value) {
    this.userCode[id].value = value;
  }

  increment(id) {
    this.userCode[id] += 1;
  }

  decrement(id) {
    this.userCode[id] -= 1;
  }
}

decorate(GameSDSHStore, {
  generateSecretCode: action,
  userCode: observable,
  increment: action,
  decrement: action,
  setCodeNumber: action,
  setCodeComparisonState: action,
});

export default GameSDSHStore;
