import { useState, useEffect } from "react";

export function useKeyPress(targetKey: any, cb: any) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }: any) {
    if (targetKey.includes(key)) {
      setKeyPressed(true);
      cb();
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }: any) => {
    if (targetKey.includes(key)) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
