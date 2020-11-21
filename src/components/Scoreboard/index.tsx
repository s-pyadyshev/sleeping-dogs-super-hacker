import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.util";
// import { SubmitFormInterface } from "../../interfaces/submit-form";
import "./style.scss";

// interface ScoreboardInterface {
//   [index: number]: SubmitFormInterface;
// }

interface ScoreboardStatsInterface {
  averageScores: number;
  averageAttempts: number;
  wins: number;
  lost: number;
}

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState<any>([]);
  const [stats, setStats] = useState<ScoreboardStatsInterface>({
    averageScores: 0,
    averageAttempts: 0,
    wins: 0,
    lost: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const easterEggs = [
  //   {
  //     code: "6502",
  //     link: "https://en.wikipedia.org/wiki/MOS_Technology_6502",
  //   },
  // ];

  useEffect(() => {
    setIsLoading(true);
    const scoresDB = firestore.collection("scores");
    const statsDB = firestore.collection("stats").doc("statsDoc");
    const userScores: number[] = [];
    const userAttempts: number[] = [];

    // TODO make request logic outside
    scoresDB
      .get()
      .then(function (querySnapshot: any) {
        querySnapshot.forEach(function (doc: any) {
          setScoreboard((scoreboard: any) => [...scoreboard, doc.data()]);
          userScores.push(doc.data().score);
          userAttempts.push(doc.data().attemptsUsed);

          const averageScores =
            userScores.reduce((acc, item) => acc + item) / userScores.length;
          const averageAttempts =
            userAttempts.reduce((acc, item) => acc + item) /
            userAttempts.length;
          setStats((stats) => {
            return {
              ...stats,
              averageScores,
              averageAttempts,
            };
          });
        });
      })
      .catch(function () {
        // console.log("Error getting document:", error);
      });

    statsDB
      .get()
      .then(function (doc: any) {
        const wins = doc.data().wins;
        const lost = doc.data().lost;

        setStats((stats) => {
          return {
            ...stats,
            wins,
            lost,
          };
        });
      })
      .catch(function () {
        // console.log("Error getting document:", error);
      });
    setIsLoading(false);
  }, []);

  const scoreboardList = scoreboard
    .sort((a: { score: number }, b: { score: number }) => a.score - b.score)
    .map((score: any, index: number) => (
      <li key={score.username + score.code} className="scoreboard__list-item">
        <div className="scoreboard__item-index">{index + 1}</div>
        <div className="scoreboard__item-username">{score.username}</div>
        <div className="scoreboard__item-company">{score.company}</div>
        <div className="scoreboard__item-code">{score.code}</div>
        <div className="scoreboard__item-score">{score.score}s</div>
        <div className="scoreboard__item-attempts">{score.attemptsUsed}</div>
        <div className="scoreboard__item-date">{score.date}</div>
        <div className="scoreboard__item-comment">{score.comment}</div>
      </li>
    ));

  return (
    <div className="scoreboard card">
      <h2 className="scoreboard__title">High scores:</h2>
      <p>
        <span>
          Average time:&nbsp;
          <span className="scoreboard__value">
            {stats.averageScores.toFixed(2)}s
          </span>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          Average attempts:&nbsp;
          <span className="scoreboard__value">
            {stats.averageAttempts.toFixed(2)}
          </span>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          Wins: <span className="scoreboard__value">{stats.wins}</span>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          Lost: <span className="scoreboard__value">{stats.lost}</span>
        </span>
      </p>
      {isLoading ? <div>Loading...</div> : <ul>{scoreboardList}</ul>}
    </div>
  );
};

export default Scoreboard;
