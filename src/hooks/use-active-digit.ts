import { useCallback, useState } from "react";

export const useActiveDigit = () => {
  const [currentDigitId, setCurrentDigitId] = useState(0);

  const increment = useCallback(() => {
    setCurrentDigitId((id) => id + 1);
  }, []);

  const decrement = useCallback(() => {
    setCurrentDigitId((id) => id - 1);
  }, []);

  const resetToFirst = useCallback(() => {
    setCurrentDigitId(0);
  }, []);

  const resetToLast = useCallback(() => {
    setCurrentDigitId(3);
  }, []);

  return {
    currentDigitId,
    increment,
    decrement,
    resetToFirst,
    resetToLast,
  };
};
