import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useGame } from "../../contexts/GameProvider";
import "./style.scss";
import { useTranslation } from "react-i18next";

type LanguagesType = {
  [key: string]: { name: string };
};
const languages: LanguagesType = {
  en: { name: "En" },
  ru: { name: "Ru" },
};

const GameMenu: React.FC = () => {
  const game = useGame();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const removeInputBlur = (event: React.FormEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).blur();
  };

  const startGame = () => {
    navigate("/game");
    game.resetCounter();
    game.gameStart();
  };

  const debouncedStartGame = debounce(startGame, 1000);

  const handleStartClick = (event: React.FormEvent<HTMLButtonElement>) => {
    removeInputBlur(event);
    debouncedStartGame();
  };

  return (
    <nav className="game-menu">
      <ul className="game-menu__list">
        <li className="game-menu__item">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            {t("menu.howtoplay")}
          </NavLink>
        </li>
        <li className="game-menu__item">
          <button type="button" className="button" onClick={handleStartClick}>
            {game.isGameStarted ? t("menu.restart") : t("menu.start")}
          </button>
        </li>
        <li className="game-menu__item">
          <NavLink
            to="about"
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            {t("menu.about")}
          </NavLink>
        </li>
        <li className="game-menu__item">
          <NavLink
            to="highscore"
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            {t("menu.highscore")}
          </NavLink>
        </li>
        <li>
          {Object.keys(languages).map((lang: string) => (
            <button
              key={lang}
              className={i18n.resolvedLanguage === lang ? "is-active" : ""}
              type="button"
              onClick={() => i18n.changeLanguage(lang)}
            >
              {languages[lang].name}
            </button>
          ))}
        </li>
      </ul>
    </nav>
  );
};

export default GameMenu;
