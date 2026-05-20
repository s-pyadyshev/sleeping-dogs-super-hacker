import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  applyCodeCheck,
  applyGameOver,
  decrementCodeNumber,
  gameStart as createGameStartState,
  incrementCodeNumber,
} from "../game/game-logic";
import { createInitialGameState, type GameState } from "../game/game-state";

type GameContextValue = GameState & {
  elapsedCounter: number;
  resetCounter: () => void;
  endCounter: () => void;
  gameStart: () => void;
  checkCode: () => boolean;
  incrementDigit: (id: number) => void;
  decrementDigit: (id: number) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GameState>(createInitialGameState);
  const [elapsedCounter, setElapsedCounter] = useState(0);
  const counterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCounterTimeout = useCallback(() => {
    if (counterTimeoutRef.current !== null) {
      clearTimeout(counterTimeoutRef.current);
      counterTimeoutRef.current = null;
    }
  }, []);

  const endCounter = useCallback(() => {
    clearCounterTimeout();
    setElapsedCounter(0);
  }, [clearCounterTimeout]);

  const resetCounter = useCallback(() => {
    endCounter();
  }, [endCounter]);

  const scheduleCounterTick = useCallback(() => {
    clearCounterTimeout();
    counterTimeoutRef.current = setTimeout(() => {
      setElapsedCounter((value) => value + 1);
    }, 1000);
  }, [clearCounterTimeout]);

  useEffect(() => {
    if (!state.isGameStarted || state.isUnlocked) {
      clearCounterTimeout();
      return;
    }

    scheduleCounterTick();
    return clearCounterTimeout;
  }, [
    elapsedCounter,
    state.isGameStarted,
    state.isUnlocked,
    scheduleCounterTick,
    clearCounterTimeout,
  ]);

  useEffect(() => {
    setState((current) => ({ ...current, counter: elapsedCounter }));
  }, [elapsedCounter]);

  const gameStart = useCallback(() => {
    endCounter();
    setState(createGameStartState());
    scheduleCounterTick();
  }, [endCounter, scheduleCounterTick]);

  const incrementDigit = useCallback((id: number) => {
    setState((current) => ({
      ...current,
      userCode: incrementCodeNumber(current.userCode, id),
    }));
  }, []);

  const decrementDigit = useCallback((id: number) => {
    setState((current) => ({
      ...current,
      userCode: decrementCodeNumber(current.userCode, id),
    }));
  }, []);

  const checkCode = useCallback((): boolean => {
    let isGameOver = false;
    setState((current) => {
      const checked = applyCodeCheck(current);
      if (!checked.isUnlocked && checked.attempts === 0) {
        isGameOver = true;
        return applyGameOver(checked);
      }
      return checked;
    });
    return isGameOver;
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      elapsedCounter,
      resetCounter,
      endCounter,
      gameStart,
      checkCode,
      incrementDigit,
      decrementDigit,
    }),
    [
      state,
      elapsedCounter,
      resetCounter,
      endCounter,
      gameStart,
      checkCode,
      incrementDigit,
      decrementDigit,
    ]
  );

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
};

export const useGame = (): GameContextValue => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
};
