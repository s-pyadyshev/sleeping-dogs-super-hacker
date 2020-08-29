import * as React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

export interface GameMenuProps {}

const GameMenu: React.SFC<GameMenuProps> = () => {
  return (
    <div>
      <nav className="game-menu">
        <ul>
          <li className="game-menu__item">
            <NavLink to="/game" exact activeClassName="is-active">
              Start
            </NavLink>
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
    </div>
  );
};

export default GameMenu;
