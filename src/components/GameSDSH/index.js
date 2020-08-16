import React, { useRef, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/use-stores";
import cn from "classnames";

const GameSDSH = observer(() => {
  const { gameSDSHStore } = useStores();

  const handleKeyboardActions = (event) => {
    gameSDSHStore.setCodeNumber(
      event.target.getAttribute("data-key"),
      +event.target.value
    );
    gameSDSHStore.checkNumberValidity(
      event.target.getAttribute("data-key"),
      +event.target.value
    );
    // switch (event.target.value) {
    //   case "37": {
    //     // left
    //   }
    //   case "38": {
    //     // up
    //   }
    //   case "39": {
    //     // right
    //   }
    //   case "40": {
    //     // down
    //   }
    // }
  };

  useEffect(() => {
    gameSDSHStore.generateSecretCode();
    gameSDSHStore.startCounter();
  }, [gameSDSHStore.counter]);

  return (
    <div>
      <form>
        <input
          type="text"
          min="0"
          max="9"
          maxLength="1"
          data-key="0"
          onChange={handleKeyboardActions}
          className={cn({
            button: true,
            "is-invalid":
              !gameSDSHStore.code.includes(gameSDSHStore.userCode[0].value) &&
              !gameSDSHStore.userCode[0].isValid,
            "is-exist":
              gameSDSHStore.code.includes(gameSDSHStore.userCode[0].value) &&
              !gameSDSHStore.userCode[0].isValid,
            "is-valid": gameSDSHStore.userCode[0].isValid,
          })}
        />
        <input
          type="text"
          min="0"
          max="9"
          maxLength="1"
          data-key="1"
          onChange={handleKeyboardActions}
          className={cn({
            button: true,
            "is-invalid":
              !gameSDSHStore.code.includes(gameSDSHStore.userCode[1].value) &&
              !gameSDSHStore.userCode[1].isValid,
            "is-exist":
              gameSDSHStore.code.includes(gameSDSHStore.userCode[1].value) &&
              !gameSDSHStore.userCode[1].isValid,
            "is-valid": gameSDSHStore.userCode[1].isValid,
          })}
        />
        <input
          type="text"
          min="0"
          max="9"
          maxLength="1"
          data-key="2"
          onChange={handleKeyboardActions}
          className={cn({
            button: true,
            "is-invalid":
              !gameSDSHStore.code.includes(gameSDSHStore.userCode[2].value) &&
              !gameSDSHStore.userCode[2].isValid,
            "is-exist":
              gameSDSHStore.code.includes(gameSDSHStore.userCode[2].value) &&
              !gameSDSHStore.userCode[2].isValid,
            "is-valid": gameSDSHStore.userCode[2].isValid,
          })}
        />
        <input
          type="text"
          min="0"
          max="9"
          maxLength="1"
          data-key="3"
          onChange={handleKeyboardActions}
          className={cn({
            button: true,
            "is-invalid":
              !gameSDSHStore.code.includes(gameSDSHStore.userCode[3].value) &&
              !gameSDSHStore.userCode[3].isValid,
            "is-exist":
              gameSDSHStore.code.includes(gameSDSHStore.userCode[3].value) &&
              !gameSDSHStore.userCode[3].isValid,
            "is-valid": gameSDSHStore.userCode[3].isValid,
          })}
        />
        <h1>Time: {gameSDSHStore.counter}</h1>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
});

export default GameSDSH;
