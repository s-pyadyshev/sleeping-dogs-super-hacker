import React, { useState, useEffect } from "react";
import { useStores } from "../../hooks/use-stores";
import { firestore } from "../../firebase/firebase.util";

const SubmitForm = () => {
  const { gameSDSHStore } = useStores();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userForm, setUserForm] = useState<any>({
    comment: "no comments",
    score: "-",
    username: "unknown",
  });

  const submitUserScore = (event: any) => {
    event.preventDefault();

    // const userId = currentUser.displayName.replace(/\s+/g, "");

    // const userScore = {
    //   username: currentUser.displayName,
    //   score: counterStore.counter,
    //   date: "17.08.2020",
    //   comment: "comment",
    // };
    // TODO refactor form logic
    firestore
      .collection("scores")
      .doc(userForm.username)
      .set(userForm)
      .then(function () {
        setFormSubmitted(true);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const handleInput = (event: any) => {
    setUserForm({
      ...userForm,
      [event.target.getAttribute("name")]: event.target.value,
    });
  };

  useEffect(() => {
    setUserForm({
      ...userForm,
      score: gameSDSHStore.counter,
    });
  }, [gameSDSHStore.counter]);

  return (
    <div>
      {!formSubmitted ? (
        <form onSubmit={submitUserScore}>
          <label htmlFor="username">Your name:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleInput}
            required
          />
          {/* <h3>Username: {currentUser ? currentUser.displayName : null}</h3> */}
          <h3>Your lucky number: {gameSDSHStore.code}</h3>
          <h3>Time spent: {gameSDSHStore.counter} s</h3>
          <h3>Attempts used: {gameSDSHStore.attemptsUsed}</h3>

          {/* <h3>Date: {currentDate}</h3> */}
          <label>Leave a comment:</label>
          <textarea name="comment" onChange={handleInput} required></textarea>
          <button type="submit">Submit</button>
        </form>
      ) : null}
      {formSubmitted ? (
        <div>
          <h3>Form was submitted</h3>{" "}
          {/* <button onClick={handleClick}>Start</button> */}
        </div>
      ) : null}
    </div>
  );
};

export default SubmitForm;
