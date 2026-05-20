import { useEffect, useRef } from "react";
import { useGame } from "../../contexts/GameProvider";
import "./style.scss";
import { useTranslation } from "react-i18next";

const Counter = () => {
  const game = useGame();
  const { t } = useTranslation();
  const isUnlockedRef = useRef(game.isUnlocked);

  isUnlockedRef.current = game.isUnlocked;

  useEffect(() => {
    return () => {
      if (!isUnlockedRef.current) {
        game.endCounter();
      }
    };
  }, [game.endCounter]);

  return (
    <span className="counter">
      {t("gameScreen.time")}:
      <span className="counter__value">{game.elapsedCounter}</span>
    </span>
  );
};

export default Counter;
