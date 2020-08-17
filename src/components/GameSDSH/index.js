import React, { useRef, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/use-stores";
import cn from "classnames";
import { firestore } from "../../firebase/firebase.util";

const GameSDSH = observer(({ currentUser }) => {
  const { gameSDSHStore, counterStore } = useStores();
  const currentDate = new Date();

  const handleKeyboardActions = (event) => {
    gameSDSHStore.setCodeNumber(
      event.target.getAttribute("data-key"),
      +event.target.value
    );
    gameSDSHStore.checkNumberValidity(
      event.target.getAttribute("data-key"),
      +event.target.value
    );
    // switch (event.target.value) {
    //   case "37": {
    //     // left
    //   }
    //   case "38": {
    //     // up
    //   }
    //   case "39": {
    //     // right
    //   }
    //   case "40": {
    //     // down
    //   }
    // }
  };

  const submitUserScore = (event) => {
    event.preventDefault();

    const userId = currentUser.displayName.replace(/\s+/g, "");

    const userScore = {
      username: currentUser.displayName,
      score: counterStore.counter,
      date: "17.08.2020",
      comment: "comment",
    };

    // Add a new document in collection "scores"
    firestore
      .collection("scores")
      .doc(userId)
      .set(userScore)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  useEffect(() => {
    if (!counterStore.counterInProgress) {
      gameSDSHStore.generateSecretCode();
      counterStore.startCounter();
      counterStore.counterInProgress = !counterStore.counterInProgress;
    }

    if (gameSDSHStore.isUnlocked) {
      counterStore.endCounter();
    }
  }, [counterStore.counter, gameSDSHStore]);

  return (
    <div>
      <form>
        <input
          type="text"
          min="0"
          max="9"
          maxLength="1"
          data-key="0"
          onChange={handleKeyboardActions}
          className={cn({
            button: true,
            "is-invalid":
              !gameSDSHStore.code.includes(gameSDSHStore.userCode[0].value) &&
              !gameSDSHStore.userCode[0].isValid,
            "is-exist":
              gameSDSHStore.code.includes(gameSDSHStore.userCode[0].value) &&
              !gameSDSHStore.userCode[0].isValid,
            "is-valid":
              gameSDSHStore.userCode[0].isValid &&
              gameSDSHStore.code[0] === gameSDSHStore.userCode[0].value,
          })}
        />
        <input
          type="text"
          min="0"
          max="9"
          maxLength="1"
          data-key="1"
          onChange={handleKeyboardActions}
          className={cn({
            button: true,
            "is-invalid":
              !gameSDSHStore.code.includes(gameSDSHStore.userCode[1].value) &&
              !gameSDSHStore.userCode[1].isValid,
            "is-exist":
              gameSDSHStore.code.includes(gameSDSHStore.userCode[1].value) &&
              !gameSDSHStore.userCode[1].isValid,
            "is-valid":
              gameSDSHStore.userCode[1].isValid &&
              gameSDSHStore.code[1] === gameSDSHStore.userCode[1].value,
          })}
        />
        <input
          type="text"
          min="0"
          max="9"
          maxLength="1"
          data-key="2"
          onChange={handleKeyboardActions}
          className={cn({
            button: true,
            "is-invalid":
              !gameSDSHStore.code.includes(gameSDSHStore.userCode[2].value) &&
              !gameSDSHStore.userCode[2].isValid,
            "is-exist":
              gameSDSHStore.code.includes(gameSDSHStore.userCode[2].value) &&
              !gameSDSHStore.userCode[2].isValid,
            "is-valid":
              gameSDSHStore.userCode[2].isValid &&
              gameSDSHStore.code[2] === gameSDSHStore.userCode[2].value,
          })}
        />
        <input
          type="text"
          min="0"
          max="9"
          maxLength="1"
          data-key="3"
          onChange={handleKeyboardActions}
          className={cn({
            button: true,
            "is-invalid":
              !gameSDSHStore.code.includes(gameSDSHStore.userCode[3].value) &&
              !gameSDSHStore.userCode[3].isValid,
            "is-exist":
              gameSDSHStore.code.includes(gameSDSHStore.userCode[3].value) &&
              !gameSDSHStore.userCode[3].isValid,
            "is-valid":
              gameSDSHStore.userCode[3].isValid &&
              gameSDSHStore.code[3] === gameSDSHStore.userCode[3].value,
          })}
        />
        {!gameSDSHStore.isUnlocked ? (
          <h1>Time: {counterStore.counter}</h1>
        ) : null}
      </form>

      {gameSDSHStore.isUnlocked ? (
        <form onSubmit={submitUserScore}>
          <h3>Username: {currentUser ? currentUser.displayName : null}</h3>
          <h3>Score: {counterStore.counter}</h3>
          {/* <h3>Date: {currentDate}</h3> */}
          <label>Leave a comment:</label>
          <textarea></textarea>
          <button type="submit">Submit</button>
        </form>
      ) : null}
    </div>
  );
});

export default GameSDSH;
