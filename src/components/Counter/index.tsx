import { useEffect } from "react";
import { useGame } from "../../contexts/GameProvider";
import "./style.scss";
import { useTranslation } from "react-i18next";

const Counter = () => {
  const game = useGame();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      if (!game.isUnlocked) {
        game.endCounter();
      }
    };
  }, [game.isUnlocked, game.endCounter]);

  return (
    <span className="counter">
      {t("gameScreen.time")}:
      <span className="counter__value">{game.elapsedCounter}</span>
    </span>
  );
};

export default Counter;
