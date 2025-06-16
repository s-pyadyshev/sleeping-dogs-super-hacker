import * as React from "react";
import { useEffect, useState } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { getGithubStats } from "../../api";
import githubStarsLogoColor from "../../assets/images/github-stars-logo-color.png";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const [stargazersCount, setStargazersCount] = useState(0);

  useEffect(() => {
    getGithubStats().then((data) => setStargazersCount(data.stargazers_count));
  }, []);

  return (
    <div className="about card">
      {t("about.text1")}&nbsp;
      <a
        className="link"
        href="https://en.wikipedia.org/wiki/Sleeping_Dogs_(video_game)"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sleeping Dogs
      </a>
      &nbsp;{t("about.text2")}&nbsp;
      <a className="link" href="https://en.wikipedia.org/wiki/Bulls_and_Cows">
        Bull and Cows
      </a>
      . {t("about.text3")}&nbsp;
      <a
        href="https://store.steampowered.com/app/202170/Sleeping_Dogs/"
        className="link"
      >
        Steam
      </a>
      .
      <p>
        {t("about.text4")}:&nbsp;
        <a
          className="link"
          href="https://github.com/facebook/react"
          target="_blank"
          rel="noopener noreferrer"
        >
          React 16.3
        </a>
        ,&nbsp;
        <a
          className="link"
          href="https://mobx.js.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MobX
        </a>
        ,&nbsp;
        <a
          className="link"
          href="https://firebase.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firebase
        </a>
        .
      </p>
      <p>{t("about.text5")}</p>
      <p>{t("about.text6")}</p>
      <p>
        {t("about.text7")}:&nbsp;
        <a
          className="link"
          href="https://github.com/s-pyadyshev/sleeping-dogs-super-hacker"
        >
          Github
        </a>
        <img src={githubStarsLogoColor} alt="github stars logo." className="about__github" />
        <span>{ stargazersCount }</span>
      </p>
    </div>
  );
};

export default AboutPage;
