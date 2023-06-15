import { useEffect } from "react";
import { useStores } from "../../hooks/use-stores";
import "./style.scss";
import { useTranslation } from "react-i18next";

const Counter = () => {
  const { counterStore, gameSDSHStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      gameSDSHStore.counter = counterStore.counter;

      if (!gameSDSHStore.isUnlocked) {
        counterStore.endCounter();
      }
    };
  }, [counterStore, gameSDSHStore]);

  return (
    <span className="counter">
      {t("gameScreen.time")}:
      <span className="counter__value">{counterStore.counter}</span>
    </span>
  );
};

export default Counter;
