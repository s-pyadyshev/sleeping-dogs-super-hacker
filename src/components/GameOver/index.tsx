import { useGame } from "../../contexts/GameProvider";
import "./style.scss";
import { useTranslation } from "react-i18next";

const GameOver = () => {
  const game = useGame();
  const { t } = useTranslation();

  return (
    <div className="form-code-wrap">
      <div className="form-code">
        <div className="form-code__game-over">
          <h2>{t("gameOver.title")}</h2>
          <h3>
            {t("gameOver.number")}: {game.code}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
