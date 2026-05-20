import React, { useRef } from "react";
import cn from "classnames";
import Counter from "../Counter";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useActiveDigit } from "../../hooks/use-active-digit";
import { useGame } from "../../contexts/GameProvider";
import { useIncrementStatMutation } from "../../hooks/queries";
import "./style.scss";
import { useTranslation } from "react-i18next";

const GameSDSH = () => {
  const { t } = useTranslation();
  const game = useGame();
  const incrementStatMutation = useIncrementStatMutation();
  const activeDigit = useActiveDigit();
  const inputsIds = [0, 1, 2, 3];
  const inputRef = useRef<HTMLInputElement>(null);

  const checkCode = () => {
    if (game.checkCode()) {
      incrementStatMutation.mutate("lost");
    }
  };

  const pressUpCallback = () => {
    game.incrementDigit(activeDigit.currentDigitId);
  };

  const pressDownCallback = () => {
    game.decrementDigit(activeDigit.currentDigitId);
  };

  const pressLeftCallback = () => {
    if (activeDigit.currentDigitId === 0) {
      activeDigit.resetToLast();
    } else {
      activeDigit.decrement();
    }
  };

  const pressRighttCallback = () => {
    if (activeDigit.currentDigitId === 3) {
      activeDigit.resetToFirst();
    } else {
      activeDigit.increment();
    }
  };

  const pressEnterCallback = () => {
    checkCode();
  };

  useKeyPress(["Up", "ArrowUp", "W", "w", "Ц", "ц"], pressUpCallback);
  useKeyPress(["Left", "ArrowLeft", "A", "a", "Ф", "ф"], pressLeftCallback);
  useKeyPress(["Down", "ArrowDown", "S", "s", "Ы", "ы"], pressDownCallback);
  useKeyPress(["Right", "ArrowRight", "D", "d", "В", "в"], pressRighttCallback);
  useKeyPress(["Enter"], pressEnterCallback);

  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handleCodeCheck = (event: React.FormEvent) => {
    event.preventDefault();
    checkCode();
  };

  const incrementDigit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const key = target.getAttribute("data-key");
    if (key !== null) {
      game.incrementDigit(parseInt(key, 10));
    }
  };

  const decrementDigit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const key = target.getAttribute("data-key");
    if (key !== null) {
      game.decrementDigit(parseInt(key, 10));
    }
  };

  return (
    <div className="form-code-wrap">
      <form className={cn("form-code")} onSubmit={handleCodeCheck}>
        <div className="form-code__interface">
          <div className="form-code__stats">
            <div>
              {t("gameScreen.attempts")}:&nbsp;
              <span className="form-code__stats-attempts-value">
                {game.attempts}
              </span>
            </div>
            {!game.isUnlocked ? <Counter /> : null}
          </div>
          <div className={cn("form-code__input-group")}>
            {inputsIds.map((id) => (
              <div className={cn("form-code__input")} key={id}>
                <button
                  type="button"
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
                  value={game.userCode[id].value}
                  onChange={() => {}}
                  className={cn({
                    input: true,
                    "full-width": true,
                    "is-focus": activeDigit.currentDigitId === id,
                    "is-invalid":
                      !game.userCode[id].isExist && !game.userCode[id].isValid,
                    "is-exist":
                      game.userCode[id].isExist && !game.userCode[id].isValid,
                    "is-valid":
                      game.userCode[id].isExist && game.userCode[id].isValid,
                  })}
                />
                <button
                  type="button"
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
};

export default GameSDSH;
