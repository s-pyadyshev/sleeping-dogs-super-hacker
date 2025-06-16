import * as React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";

const InstructionsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <article className="instructions card">
      <p>{t("howtoplay.start")}&nbsp;</p>
      <p>
        <span className="icon icon-invalid-place"></span>
        <span>{t("howtoplay.yellow")}</span>
      </p>
      <p>
        <span className="icon icon-invalid-digit"></span>
        <span>{t("howtoplay.red")}</span>
      </p>
      <p>
        <span className="icon icon-valid-digit"></span>
        <span>{t("howtoplay.green")}</span>
      </p>
      <p>{t("howtoplay.controls")}</p>
    </article>
  );
};

export default InstructionsPage;
