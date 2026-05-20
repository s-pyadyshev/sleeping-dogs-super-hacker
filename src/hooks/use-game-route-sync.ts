import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGame } from "../contexts/GameProvider";

/** Reset game state when leaving the /game route. */
export const useGameRouteSync = () => {
  const location = useLocation();
  const { resetGame } = useGame();

  useEffect(() => {
    if (location.pathname !== "/game") {
      resetGame();
    }
  }, [location.pathname, resetGame]);
};
