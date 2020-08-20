import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.util";

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    const scoresDB = firestore.collection("scores");

    scoresDB
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setScoreboard((scoreboard) => [...scoreboard, doc.data()]);
        });
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    console.log(scoreboard);
  }, []);

  return (
    <div>
      <h2>High scores:</h2>
      <ul>
        {scoreboard
          .sort((a, b) => a.score - b.score)
          .map((score, index) => (
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
