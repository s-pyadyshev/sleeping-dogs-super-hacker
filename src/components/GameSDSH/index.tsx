import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/use-stores";
import cn from "classnames";
import SubmitForm from "../SubmitForm";
import Counter from "../Counter";
import "./style.scss";

const GameSDSH = observer(() => {
  const { gameSDSHStore, counterStore } = useStores();
  const inputsIds = [0, 1, 2, 3];
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyboardActions = (event: any) => {
    gameSDSHStore.setCodeNumber(
      event.target.getAttribute("data-key"),
      +event.target.value
    );
    event.target.select();
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

  const handleFocus = (event: any) => {
    event.target.select();
  };

  const handleCodeCheck = (event: any) => {
    event.preventDefault();

    gameSDSHStore.checkCodeValidity();

    // last try
    if (!gameSDSHStore.isUnlocked && gameSDSHStore.attempts === 1) {
      gameSDSHStore.isGameOver = true;
      gameSDSHStore.isGameStarted = false;
      gameSDSHStore.userCode = gameSDSHStore.initialUserCodeState;
    }

    if (!gameSDSHStore.isUnlocked && gameSDSHStore.attempts > 1) {
      gameSDSHStore.decreaseAttempts();
      gameSDSHStore.calculateAttemptsUsed();
    }
  };

  useEffect(() => {
    if (!counterStore.counterInProgress) {
      counterStore.startCounter();
      counterStore.counterInProgress = !counterStore.counterInProgress;
    }

    if (gameSDSHStore.isUnlocked) {
      counterStore.endCounter();
    }
  }, [counterStore.counter, gameSDSHStore]);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <form className={cn("form-code")}>
        <div className={cn("form-code__input-group")}>
          {inputsIds.map((id) => (
            <div className={cn("form-code__input")} key={id}>
              <input
                type="text"
                min="0"
                max="9"
                maxLength={1}
                key={id}
                data-key={id}
                ref={id === 0 ? inputRef : null}
                onChange={handleKeyboardActions}
                onFocus={handleFocus}
                value={gameSDSHStore.userCode[id].value}
                className={cn({
                  input: true,
                  "full-width": true,
                  "is-invalid":
                    !gameSDSHStore.userCode[id].isExist &&
                    !gameSDSHStore.userCode[id].isValid,
                  "is-exist":
                    gameSDSHStore.userCode[id].isExist &&
                    !gameSDSHStore.userCode[id].isValid,
                  "is-valid":
                    gameSDSHStore.userCode[id].isExist &&
                    gameSDSHStore.userCode[id].isValid,
                })}
              />
            </div>
          ))}
        </div>

        <button onClick={handleCodeCheck}>TRY</button>

        {!gameSDSHStore.isUnlocked ? <Counter /> : null}
        <h2>Attempts: {gameSDSHStore.attempts}</h2>
      </form>

      <button onClick={() => clearTimeout(counterStore.counterTimeout)}>
        stop it
      </button>

      {gameSDSHStore.isUnlocked ? <SubmitForm /> : null}
    </div>
  );
});

export default GameSDSH;
