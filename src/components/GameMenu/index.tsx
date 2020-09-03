import React from "react";
import { observer } from "mobx-react";
import { NavLink, useHistory } from "react-router-dom";
import { useStores } from "../../hooks/use-stores";

import "./style.scss";

const GameMenu: React.SFC = observer(() => {
  const { gameSDSHStore, counterStore } = useStores();
  const history = useHistory();

  const handleClick = () => {
    history.push("/game");
    counterStore.counter = 0;
    gameSDSHStore.gameStart();
  };

  return (
    <nav className="game-menu">
      <ul className="game-menu__list">
        <li className="game-menu__item">
          <NavLink to="/" exact activeClassName="is-active">
            How to play
          </NavLink>
        </li>
        <li className="game-menu__item">
          {gameSDSHStore.isGameOver || gameSDSHStore.isUnlocked ? (
            <button
              className="button"
              onClick={handleClick}
              disabled={gameSDSHStore.isGameStarted}
            >
              Try Again
            </button>
          ) : (
            <button
              className="button"
              onClick={handleClick}
              disabled={gameSDSHStore.isGameStarted}
            >
              Start
            </button>
          )}
        </li>
        <li className="game-menu__item">
          <NavLink to="/about" exact activeClassName="is-active">
            About
          </NavLink>
        </li>
        <li className="game-menu__item">
          <NavLink to="/highscore" exact activeClassName="is-active">
            Highscore
          </NavLink>
        </li>
      </ul>
    </nav>
  );
});

export default GameMenu;
