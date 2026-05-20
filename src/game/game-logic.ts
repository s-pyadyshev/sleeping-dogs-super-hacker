import { cond, dec, equals, T } from "ramda";
import { ALLOWED_DIGITS } from "../constants";
import type { UserCodeInterface } from "../interfaces/user-code";
import { shuffleCutCode } from "../utils";
import { ATTEMPTS_INITIAL, DIGIT_MAX, DIGIT_MIN } from "./constants";
import {
  createInitialGameState,
  createInitialUserCode,
  type GameState,
} from "./game-state";

export const generateSecretCode = (): number[] =>
  shuffleCutCode(ALLOWED_DIGITS, createInitialUserCode().length);

export const gameStart = (): GameState => ({
  ...createInitialGameState(),
  code: generateSecretCode(),
  isGameStarted: true,
});

export const incrementCodeNumber = (
  userCode: UserCodeInterface[],
  id: number
): UserCodeInterface[] =>
  userCode.map((digit, index) => {
    if (index !== id) return digit;
    return {
      ...digit,
      value: digit.value === DIGIT_MAX ? DIGIT_MIN : digit.value + 1,
    };
  });

export const decrementCodeNumber = (
  userCode: UserCodeInterface[],
  id: number
): UserCodeInterface[] =>
  userCode.map((digit, index) => {
    if (index !== id) return digit;
    return {
      ...digit,
      value: digit.value === DIGIT_MIN ? DIGIT_MAX : digit.value - 1,
    };
  });

export const applyCodeCheck = (state: GameState): GameState => {
  const attempts = dec(state.attempts);
  const attemptsUsed = ATTEMPTS_INITIAL - attempts;
  const userCodeArray = state.userCode.map((item) => item.value);
  const isEqualCodes = equals(state.code, userCodeArray);

  let isUnlocked = state.isUnlocked;
  let isGameStarted = state.isGameStarted;

  const userCode = state.userCode.map((digit, id) => {
    if (isEqualCodes) {
      isGameStarted = false;
      isUnlocked = true;
      return { ...digit, isExist: true, isValid: true };
    }

    const isUserValueExist = state.code.includes(digit.value);
    const isUserValueValid = state.code[id] === digit.value;

    const nextDigit = { ...digit };

    const setPartialValidPlacement = () => {
      nextDigit.isExist = true;
      nextDigit.isValid = false;
    };

    const setValidPlacement = () => {
      nextDigit.isExist = true;
      nextDigit.isValid = true;
    };

    const setInvalidPlacement = () => {
      nextDigit.isValid = false;
      nextDigit.isExist = false;
    };

    cond([
      [() => isUserValueExist && !isUserValueValid, setPartialValidPlacement],
      [() => isUserValueExist && isUserValueValid, setValidPlacement],
      [T, setInvalidPlacement],
    ])();

    return nextDigit;
  });

  return {
    ...state,
    attempts,
    attemptsUsed,
    userCode,
    isUnlocked,
    isGameStarted,
  };
};

export const applyGameOver = (state: GameState): GameState => ({
  ...state,
  isGameOver: true,
  isGameStarted: false,
  userCode: createInitialUserCode(),
});
