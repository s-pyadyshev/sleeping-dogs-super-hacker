import React, { useEffect, useRef } from "react";
import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../hooks/use-stores";
import cn from "classnames";
import Counter from "../Counter";
import { useKeyPress } from "../../hooks/useKeyPress";
import "./style.scss";
// import GameSDSHStore from "../../stores/GameSDSHStore";

// observer - from mobx-react.
// The observer HoC / decorator subscribes React components automatically to any observables that are used during render.
// As a result, components will automatically re - render when relevant observables change.
// But it also makes sure that components don't re-render when there are no relevant changes.

// observer automatically tracks observables used during render

// Note that observer only subscribes to observables used during the own render of the component.
// So if observables are passed to child components,
// those have to be marked as observer as well.This also holds for any callback based components.

// When using useLocalStore, all properties of the returned object will be made observable automatically,
// getters will be turned into computed properties,
// and methods will be bound to the store and apply mobx transactions automatically.
// If new class instances are returned from the initializer, they will be kept as is.

// When to apply observer? The simple rule of thumb is: all components that render observable data.

const GameSDSH = observer(() => {
  const { gameSDSHStore, counterStore } = useStores();
  const activeDigitState = useLocalStore(() => ({
    currentDigitId: 0,
    increment() {
      activeDigitState.currentDigitId += 1;
    },
    decrement() {
      activeDigitState.currentDigitId -= 1;
    },
    resetToFirst() {
      activeDigitState.currentDigitId = 0;
    },
    resetToLast() {
      activeDigitState.currentDigitId = 3;
    },
  }));
  const inputsIds = [0, 1, 2, 3];
  const inputRef = useRef<HTMLInputElement>(null);

  const pressUpCallback = () => {
    gameSDSHStore.incrementCodeNumber(activeDigitState.currentDigitId);
  };

  const pressDownCallback = () => {
    gameSDSHStore.decrementCodeNumber(activeDigitState.currentDigitId);
  };

  const pressLeftCallback = () => {
    if (activeDigitState.currentDigitId === 0) {
      activeDigitState.resetToLast();
    } else {
      activeDigitState.decrement();
    }
  };

  const pressRighttCallback = () => {
    if (activeDigitState.currentDigitId === 3) {
      activeDigitState.resetToFirst();
    } else {
      activeDigitState.increment();
    }
  };

  const pressEnterCallback = () => {
    checkCode();
  };

  useKeyPress(["Up", "ArrowUp", "W", "w", "Ц", "ц"], pressUpCallback);
  useKeyPress(["Left", "ArrowLeft", "A", "a", "Ф", "ф"], pressLeftCallback);
  useKeyPress(["Down", "ArrowDown", "S", "s", "Ы", "ы"], pressDownCallback);
  useKeyPress(["Right", "ArrowRight", "D", "d", "В", "в"], pressRighttCallback);
  useKeyPress("Enter", pressEnterCallback);

  const handleFocus = (event: any) => {
    event.target.select();
  };

  const checkCode = () => {
    gameSDSHStore.decreaseAttempts();
    gameSDSHStore.calculateAttemptsUsed();
    gameSDSHStore.checkCodeValidity();

    // last try
    if (!gameSDSHStore.isUnlocked && gameSDSHStore.attempts === 0) {
      // TODO refactor - gameReset
      gameSDSHStore.isGameOver = true;
      gameSDSHStore.isGameStarted = false;
      gameSDSHStore.userCode = gameSDSHStore.initialUserCodeState;
    }
  };

  const handleCodeCheck = (event: any) => {
    event.preventDefault();
    checkCode();
  };

  const incrementDigit = (event: any) => {
    event.preventDefault();
    gameSDSHStore.incrementCodeNumber(event.target.getAttribute("data-key"));
  };

  const decrementDigit = (event: any) => {
    event.preventDefault();
    gameSDSHStore.decrementCodeNumber(event.target.getAttribute("data-key"));
  };

  useEffect(() => {
    if (!counterStore.counterInProgress) {
      counterStore.startCounter();
      counterStore.counterInProgress = !counterStore.counterInProgress;
    }

    if (gameSDSHStore.isUnlocked) {
      counterStore.endCounter();
    }
  }, [counterStore, counterStore.counter, gameSDSHStore]);

  return (
    <div className="form-code-wrap">
      {/* <button onClick={() => clearTimeout(counterStore.counterTimeout)}>
        stop it
      </button> */}

      <form className={cn("form-code")} onSubmit={handleCodeCheck}>
        <div className="form-code__interface">
          <div className="form-code__stats">
            <div>
              Attempts remaining:&nbsp;
              <span className="form-code__stats-attempts-value">
                {gameSDSHStore.attempts}
              </span>
            </div>
            {!gameSDSHStore.isUnlocked ? <Counter /> : null}
          </div>
          <div className={cn("form-code__input-group")}>
            {inputsIds.map((id) => (
              <div className={cn("form-code__input")} key={id}>
                <button
                  className={cn("button-increment")}
                  onClick={incrementDigit}
                  data-key={id}
                ></button>
                <input
                  type="text"
                  min="0"
                  max="9"
                  maxLength={1}
                  key={id}
                  data-key={id}
                  ref={id === 0 ? inputRef : null}
                  onFocus={handleFocus}
                  value={gameSDSHStore.userCode[id].value}
                  onChange={() => {}}
                  className={cn({
                    input: true,
                    "full-width": true,
                    "is-focus": activeDigitState.currentDigitId === id,
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
                <button
                  className={cn("button-decrement")}
                  onClick={decrementDigit}
                  data-key={id}
                ></button>
              </div>
            ))}
          </div>

          <div className="form-code__button-enter">
            <button
              type="submit"
              onClick={handleCodeCheck}
              className={cn("button-enter")}
            ></button>
          </div>
        </div>
      </form>
    </div>
  );
});

export default GameSDSH;
