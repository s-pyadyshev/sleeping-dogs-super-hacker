import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/use-stores";
import cn from "classnames";
import SubmitForm from "../SubmitForm";

const GameSDSH = observer(() => {
  const { gameSDSHStore, counterStore } = useStores();
  const buttonsIds = [0, 1, 2, 3];
  const inputRef = useRef();

  const handleKeyboardActions = (event) => {
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

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleCodeCheck = (event) => {
    event.preventDefault();
    gameSDSHStore.checkCodeValidity();

    if (gameSDSHStore.attempts < 2) {
      gameSDSHStore.decreaseAttempts();
      console.log("nooooooo!");
    } else if (!gameSDSHStore.isUnlocked && gameSDSHStore.attempts > 0) {
      gameSDSHStore.decreaseAttempts();
    }
  };

  useEffect(() => {
    if (!counterStore.counterInProgress) {
      gameSDSHStore.generateSecretCode();
      counterStore.startCounter();
      counterStore.counterInProgress = !counterStore.counterInProgress;
    }

    if (gameSDSHStore.isUnlocked) {
      counterStore.endCounter();
    }
  }, [counterStore.counter, gameSDSHStore]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <form>
        {buttonsIds.map((id) => (
          <input
            type="text"
            min="0"
            max="9"
            maxLength="1"
            key={id}
            data-key={id}
            ref={id === 0 ? inputRef : null}
            onChange={handleKeyboardActions}
            onFocus={handleFocus}
            className={cn({
              button: true,
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
        ))}

        <button onClick={handleCodeCheck}>TRY</button>

        {!gameSDSHStore.isUnlocked ? (
          <h1>Time: {counterStore.counter}</h1>
        ) : null}
        <h2>Attempts: {gameSDSHStore.attempts}</h2>
      </form>

      <button onClick={() => counterStore.endCounter()}>stop it</button>

      {gameSDSHStore.isUnlocked ? <SubmitForm /> : null}
    </div>
  );
});

export default GameSDSH;
