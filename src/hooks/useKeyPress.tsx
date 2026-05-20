import { useEffect, useRef } from "react";

export function useKeyPress(targetKey: string[], cb: () => void) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (targetKey.includes(key)) {
        cbRef.current();
      }
    };

    window.addEventListener("keydown", downHandler);
    return () => window.removeEventListener("keydown", downHandler);
  }, [targetKey]);
}
