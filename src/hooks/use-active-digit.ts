import { useCallback, useState } from "react";

const DIGIT_COUNT = 4;
const LAST_DIGIT_ID = DIGIT_COUNT - 1;

export const useActiveDigit = () => {
  const [currentDigitId, setCurrentDigitId] = useState(0);

  const moveLeft = useCallback(() => {
    setCurrentDigitId((id) => (id === 0 ? LAST_DIGIT_ID : id - 1));
  }, []);

  const moveRight = useCallback(() => {
    setCurrentDigitId((id) => (id === LAST_DIGIT_ID ? 0 : id + 1));
  }, []);

  const resetToFirst = useCallback(() => {
    setCurrentDigitId(0);
  }, []);

  const setActiveDigit = useCallback((id: number) => {
    if (id >= 0 && id <= LAST_DIGIT_ID) {
      setCurrentDigitId(id);
    }
  }, []);

  return {
    currentDigitId,
    moveLeft,
    moveRight,
    resetToFirst,
    setActiveDigit,
  };
};
