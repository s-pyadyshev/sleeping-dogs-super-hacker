import type { UserCodeInterface } from "../interfaces/user-code";
import { ATTEMPTS_INITIAL } from "./constants";

export const createInitialUserCode = (): UserCodeInterface[] => [
  { value: 0, isExist: false, isValid: false },
  { value: 0, isExist: false, isValid: false },
  { value: 0, isExist: false, isValid: false },
  { value: 0, isExist: false, isValid: false },
];

export type GameState = {
  code: number[];
  userCode: UserCodeInterface[];
  attempts: number;
  attemptsUsed: number;
  counter: number;
  isUnlocked: boolean;
  isGameOver: boolean;
  isGameStarted: boolean;
};

export const createInitialGameState = (): GameState => ({
  code: [],
  userCode: createInitialUserCode(),
  attempts: ATTEMPTS_INITIAL,
  attemptsUsed: 0,
  counter: 0,
  isUnlocked: false,
  isGameOver: false,
  isGameStarted: false,
});
