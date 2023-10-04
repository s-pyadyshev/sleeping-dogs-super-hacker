import React from "react";
import { observer } from "mobx-react";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useStores } from "../../hooks/use-stores";
import "./style.scss";
import { useTranslation } from "react-i18next";

type LanguagesType = {
  [key: string]: { name: string };
};
const languages: LanguagesType = {
  en: { name: "En" },
  ru: { name: "Ru" },
};

const GameMenu: React.FC = observer(() => {
  const { gameSDSHStore, counterStore } = useStores();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const removeInputBlur = (event: any) => {
    event.target.blur();
  };

  const startGame = () => {
    navigate("/game");
    counterStore.counter = 0;
    counterStore.endCounter();
    gameSDSHStore.gameStart();
  };

  const debouncedStartGame = debounce(startGame, 1000);

  const handleStartClick = (event: React.FormEvent<HTMLButtonElement>) => {
    // TODO refactor for new React, events are no more null
    removeInputBlur(event); // to avoid React event pooling:
    // the event object (a wrapper created by React over the actual event object) that is passed to an event callback is reused
    // and hence it will be nullified or cleared once the event callback finishes.
    // So accessing event.target.value in the example above throws an error because event object was nullified
    // when the event callback finished and we are trying to access it later through the debounce function.
    debouncedStartGame();
    // TODO - set focus on 1st input
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
          <button className="button" onClick={handleStartClick}>
            {gameSDSHStore.isGameStarted ? t("menu.restart") : t("menu.start")}
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
});

export default GameMenu;
