import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.util";

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState<any>([]);

  useEffect(() => {
    const scoresDB = firestore.collection("scores");

    scoresDB
      .get()
      .then(function (querySnapshot: any) {
        querySnapshot.forEach(function (doc: any) {
          setScoreboard((scoreboard: any) => [...scoreboard, doc.data()]);
        });
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <div>
      <h2>High scores:</h2>
      <ul>
        {scoreboard.map((score: any, index: number) => (
          <li key={score.username + index}>
            <div>{score.score}</div>
            <div>{score.username}</div>
            {/* <div>{score.date}</div> */}
            <div>{score.comment}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
