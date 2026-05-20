import { useMemo } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import type { ScoreEntry } from "../../api";
import { useScoreboardStats } from "../../hooks/queries";

const Scoreboard = () => {
  const { scores, stats, isLoading } = useScoreboardStats();
  const { t } = useTranslation();

  const sortedScores = useMemo(
    () => [...scores].sort((a, b) => a.score - b.score),
    [scores]
  );

  const scoreboardList = sortedScores.map((score: ScoreEntry, index: number) => (
    <li key={score.username} className="scoreboard__list-item">
      <div className="scoreboard__item-index">{index + 1}</div>
      <div className="scoreboard__item-username">{score.username}</div>
      <div className="scoreboard__item-code">{score.code}</div>
      <div className="scoreboard__item-score">{score.score}s</div>
      <div className="scoreboard__item-attempts">{score.attemptsUsed}</div>
      <div className="scoreboard__item-date">{score.date}</div>
      <div className="scoreboard__item-comment">{score.comment}</div>
    </li>
  ));

  return (
    <div className="scoreboard card">
      <h2 className="scoreboard__title">{t("highscore.title")}:</h2>
      <p>
        <span>
          {t("highscore.averageTime")}:&nbsp;
          <span className="scoreboard__value">
            {stats.averageScores.toFixed(2)}s
          </span>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          {t("highscore.averageAttempts")}:&nbsp;
          <span className="scoreboard__value">
            {stats.averageAttempts.toFixed(2)}
          </span>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          {t("highscore.wins")}:{" "}
          <span className="scoreboard__value">{stats.wins}</span>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          {t("highscore.lost")}:{" "}
          <span className="scoreboard__value">{stats.lost}</span>
        </span>
      </p>

      {isLoading ? (
        <div>{t("state.loading")}</div>
      ) : (
        <ul className="scoreboard__list">
          <li className="scoreboard__list-item">
            <div className="scoreboard__item-index">
              <button type="button">No</button>
            </div>
            <div className="scoreboard__item-username">
              <button type="button">Nickname</button>
            </div>
            <div className="scoreboard__item-code">
              <button type="button">Code</button>
            </div>
            <div className="scoreboard__item-score">
              <button type="button">Score</button>
            </div>
            <div className="scoreboard__item-attempts">
              <button type="button">Attempts</button>
            </div>
            <div className="scoreboard__item-date">
              <button type="button">Date</button>
            </div>
            <div className="scoreboard__item-comment">
              <span>Comment</span>
            </div>
          </li>
          {scoreboardList}
        </ul>
      )}
    </div>
  );
};

export default Scoreboard;
