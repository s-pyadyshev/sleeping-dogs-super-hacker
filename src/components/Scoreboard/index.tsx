import { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.util";
// import { SubmitFormInterface } from "../../interfaces/submit-form";
import "./style.scss";

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

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState<any>([]);
  const [stats, setStats] = useState<ScoreboardStatsInterface>({
    averageScores: 0,
    averageAttempts: 0,
    wins: 0,
    lost: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scoreboard.length === 0) {
      return;
    }
    const userAttempts: number[] = scoreboard.reduce(
      (acc: number[], item: any) => [...acc, item.attemptsUsed],
      []
    );
    const userScores: number[] = scoreboard.reduce(
      (acc: number[], item: any) => [...acc, item.score],
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

  const scoreboardList = scoreboard
    .sort((a: { score: number }, b: { score: number }) => a.score - b.score)
    .map((score: ScoreboardInterface, index: number) => (
      <li key={index} className="scoreboard__list-item">
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="scoreboard__list">{scoreboardList}</ul>
      )}
    </div>
  );
};

export default Scoreboard;
