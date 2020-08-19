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

  userCode = this.initialUserCodeState;

  attempts = 4;
  counter = 0;

  decreaseAttempts() {
    if (this.attempts === 0) {
      this.isGameOver = true;
      this.isGameStarted = false;
      this.userCode = this.initialUserCodeState;
    }
    this.attempts = this.attempts - 1;
  }

  isUnlocked = false;
  isGameOver = false;
  isGameStarted = false;

  checkCodeValidity() {
    const buttonsIds = [0, 1, 2, 3];

    const userCodeArray = this.userCode.map((item) => item.value);
    const isEqualCodes = isEqual(this.code, userCodeArray) ? true : false;

    buttonsIds.map((id) => {
      const isUserValueExist = this.code.includes(this.userCode[id].value)
        ? true
        : false;
      const isUserValueValid =
        this.code[id] === this.userCode[id].value ? true : false;

      if (isEqualCodes) {
        this.userCode.map((code) => {
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

  setCodeNumber(id, value) {
    this.userCode[id].value = value;
  }

  gameStart() {
    this.isGameStarted = true;
    this.attempts = 4;
    // this.counter = 0;
  }
}

decorate(GameSDSHStore, {
  attempts: observable,
  generateSecretCode: action,
  userCode: observable,
  setCodeNumber: action,
  setCodeComparisonState: action,
  checkCodeValidity: action,
  isGameStarted: observable,
  isGameOver: observable,
  counter: observable,
});

export default GameSDSHStore;
