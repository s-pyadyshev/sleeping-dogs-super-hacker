import { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.util";
// import { SubmitFormInterface } from "../../interfaces/submit-form";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { attempt } from "lodash";

// interface ScoreboardInterface {
//   [index: number]: SubmitFormInterface;
// }

interface ScoreboardInterface {
  username: string;
  code: string;
  company: string;
  date: string;
  score: number;
  attemptsUsed: number;
  comment: string;
}

interface ScoreboardStatsInterface {
  averageScores: number;
  averageAttempts: number;
  wins: number;
  lost: number;
}

const sortingMap = {
  index: "default",
  username: "default",
  code: "descend",
  score: "default",
  attempts: "default",
  date: "default"
}

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState<ScoreboardInterface[]>([]);
  const [scoreboardSorted, setScoreboardSorted] = useState<ScoreboardInterface[]>(scoreboard);
  const [sorting, setSorting] = useState({});
  const [stats, setStats] = useState<ScoreboardStatsInterface>({
    averageScores: 0,
    averageAttempts: 0,
    wins: 0,
    lost: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    const scoresDB = firestore.collection("scores");
    const statsDB = firestore.collection("stats").doc("statsDoc");

    scoresDB
      .get()
      .then((querySnapshot: any) => {
        let scoresData = querySnapshot.docs.map((doc: any) => {
          return { ...doc.data() };
        });
        setScoreboard([...scoreboard, ...scoresData]);
        setScoreboardSorted([...scoreboard, ...scoresData]);
        setSorting({
          score: "descend"
        })
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    statsDB
      .get()
      .then((doc: any) => {
        const { wins, lost } = doc.data();

        setStats((stats) => {
          return {
            ...stats,
            wins,
            lost,
          };
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  useEffect(() => {
    if (scoreboard.length === 0) {
      return;
    }
    const userAttempts: number[] = scoreboard.reduce(
      (acc: number[], item: ScoreboardInterface) => [...acc, item.attemptsUsed],
      []
    );
    const userScores: number[] = scoreboard.reduce(
      (acc: number[], item: ScoreboardInterface) => [...acc, item.score],
      []
    );
    const averageScores =
      userScores.reduce((acc, item) => acc + item) / userScores.length;
    const averageAttempts =
      userAttempts.reduce((acc, item) => acc + item) / userAttempts.length;
    setStats((stats) => {
      return {
        ...stats,
        averageScores,
        averageAttempts,
      };
    });
  }, [scoreboard]);

  const scoreboardList = scoreboardSorted
    .sort((a: { score: number }, b: { score: number }) => a.score - b.score) // default sorting
    .map((score: ScoreboardInterface, index: number) => (
      <li key={index} className="scoreboard__list-item">
        <div className="scoreboard__item-index">{index + 1}</div>
        <div className="scoreboard__item-username">{score.username}</div>
        <div className="scoreboard__item-code">{score.code}</div>
        <div className="scoreboard__item-score">{score.score}s</div>
        <div className="scoreboard__item-attempts">{score.attemptsUsed}</div>
        <div className="scoreboard__item-date">{score.date}</div>
        <div className="scoreboard__item-comment">{score.comment}</div>
      </li>
    ));
  
  const sortScoreboard = () => {
    // const sortedScoreboard = scoreboard.sort((a: { score: number }, b: { score: number }) => a.score - b.score);
    const sortedScoreboard = scoreboard;
    setScoreboardSorted(sortedScoreboard);
  }

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
                <button>No</button>
              </div>
              <div className="scoreboard__item-username">
                <button>Nickname</button>
              </div>
              <div className="scoreboard__item-code">
                <button>Code</button>
              </div>
              <div className="scoreboard__item-score">
                <button>Score</button>
              </div>
              <div className="scoreboard__item-attempts">
                <button>Attempts</button>
              </div>
              <div className="scoreboard__item-date">
                <button>Date</button>
              </div>
              <div className="scoreboard__item-comment">
                <span>Comment</span>
              </div>
            </li>
            {scoreboardList}</ul>
      )}
    </div>
  );
};

export default Scoreboard;
