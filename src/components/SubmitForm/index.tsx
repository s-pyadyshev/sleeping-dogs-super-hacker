import React, { useState, useEffect } from "react";
import { useStores } from "../../hooks/use-stores";
import { firestore } from "../../firebase/firebase.util";

const SubmitForm = () => {
  const { gameSDSHStore } = useStores();
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

    firestore
      .collection("scores")
      .doc(userForm.username)
      .set(userForm)
      .then(function () {
        console.log("Document successfully written!");
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
    <form onSubmit={submitUserScore}>
      <label htmlFor="username">Your name:</label>
      <input type="text" id="username" name="username" onChange={handleInput} />
      {/* <h3>Username: {currentUser ? currentUser.displayName : null}</h3> */}
      <h3>Score: {gameSDSHStore.counter}</h3>
      {/* <h3>Date: {currentDate}</h3> */}
      <label>Leave a comment:</label>
      <textarea name="comment" onChange={handleInput}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitForm;
