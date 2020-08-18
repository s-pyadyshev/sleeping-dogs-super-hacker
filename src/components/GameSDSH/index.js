import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/use-stores";
import cn from "classnames";
import SubmitForm from "../SubmitForm";

const GameSDSH = observer(({ currentUser }) => {
  const { gameSDSHStore, counterStore } = useStores();
  const buttonsIds = [0, 1, 2, 3];

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
    if (!counterStore.counterInProgress) {
      gameSDSHStore.generateSecretCode();
      counterStore.startCounter();
      counterStore.counterInProgress = !counterStore.counterInProgress;
    }

    if (gameSDSHStore.isUnlocked) {
      counterStore.endCounter();
    }
  }, [counterStore.counter, gameSDSHStore]);

  return (
    <div>
      <form>
        {buttonsIds.map((id) => (
          <input
            type="text"
            min="0"
            max="9"
            maxLength="1"
            data-key={id}
            onChange={handleKeyboardActions}
            className={cn({
              button: true,
              "is-invalid":
                !gameSDSHStore.code.includes(
                  gameSDSHStore.userCode[id].value
                ) && !gameSDSHStore.userCode[id].isValid,
              "is-exist":
                gameSDSHStore.code.includes(gameSDSHStore.userCode[id].value) &&
                !gameSDSHStore.userCode[id].isValid,
              "is-valid":
                gameSDSHStore.userCode[id].isValid &&
                gameSDSHStore.code[id] === gameSDSHStore.userCode[id].value,
            })}
          />
        ))}

        {!gameSDSHStore.isUnlocked ? (
          <h1>Time: {counterStore.counter}</h1>
        ) : null}
      </form>

      <button onClick={() => counterStore.endCounter()}>stop it</button>

      {gameSDSHStore.isUnlocked ? <SubmitForm /> : null}
    </div>
  );
});

export default GameSDSH;
