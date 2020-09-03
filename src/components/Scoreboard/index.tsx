import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.util";
import "./style.scss";

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState<any>([]);
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

    // TODO make request logic outside
    scoresDB
      .get()
      .then(function (querySnapshot: any) {
        querySnapshot.forEach(function (doc: any) {
          setScoreboard((scoreboard: any) => [...scoreboard, doc.data()]);
          setIsLoading(false);
        });
      })
      .catch(function () {
        // console.log("Error getting document:", error);
      });
  }, []);

  const scoreboardList = scoreboard
    .sort((a: any, b: any) => a.score - b.score)
    .map((score: any, index: number) => (
      <li key={score.username + score.code} className="scoreboard__list-item">
        <div className="scoreboard__item-index">{index + 1}</div>
        <div className="scoreboard__item-username">{score.username}</div>
        <div className="scoreboard__item-company">{score.company}</div>
        <div className="scoreboard__item-code">{score.code}</div>
        <div className="scoreboard__item-score">{score.score}s</div>
        <div className="scoreboard__item-attempts">{score.attemptsUsed}</div>
        <div className="scoreboard__item-comment">{score.comment}</div>
      </li>
    ));

  return (
    <div className="scoreboard card">
      <h2 className="scoreboard__title">High scores:</h2>
      {isLoading ? <div>Loading...</div> : <ul>{scoreboardList}</ul>}
    </div>
  );
};

export default Scoreboard;
