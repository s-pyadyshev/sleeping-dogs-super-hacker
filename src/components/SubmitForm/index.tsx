import React, { useState, useEffect, useRef } from "react";
import { useStores } from "../../hooks/use-stores";
import { SubmitFormInterface } from "../../interfaces/submit-form";
import { firestore } from "../../firebase/firebase.util";
import { format } from "date-fns";
import "./style.scss";

const SubmitForm = () => {
  const { gameSDSHStore, counterStore } = useStores();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userForm, setUserForm] = useState<SubmitFormInterface>({
    score: 1000,
    attemptsUsed: 6,
    code: "0000",
    username: "anonym",
    company: "unknown",
    date: "new Date()",
    comment: "no comments",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const submitUserScore = (event: any) => {
    event.preventDefault();

    // TODO refactor form logic
    firestore
      .collection("scores")
      .doc(userForm.username)
      .set(userForm)
      .then(function () {
        setFormSubmitted(true);
        // TODO refactor route logic
        setTimeout(() => {
          document.location.href = "/";
        }, 2000);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const handleInput = (event: any) => {
    const currentDate = format(new Date(), "MM.dd.yyyy kk:mm");

    setUserForm({
      ...userForm,
      [event.target.getAttribute("name")]: event.target.value,
      score: counterStore.counter,
      attemptsUsed: gameSDSHStore.attemptsUsed,
      code: gameSDSHStore.code,
      date: currentDate,
    });
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [counterStore.counter, gameSDSHStore.attemptsUsed]);

  return (
    <div className="submit-form card">
      {!formSubmitted ? (
        <form onSubmit={submitUserScore}>
          <div className="input-group-stacked">
            <label htmlFor="username" className="label">
              Your name:
            </label>
            <input
              ref={inputRef}
              className="input input--full-width"
              type="text"
              id="username"
              name="username"
              onChange={handleInput}
              required
            />
          </div>
          <div className="input-group-stacked">
            <label htmlFor="company" className="label">
              Your company:
            </label>
            <input
              className="input input--full-width"
              type="text"
              id="company"
              name="company"
              onChange={handleInput}
              required
            />
          </div>
          <h3>Your lucky number: {gameSDSHStore.code}</h3>
          <h3>Time spent: {counterStore.counter}s</h3>
          <h3>Attempts used: {gameSDSHStore.attemptsUsed}</h3>

          {/* <h3>Date: {currentDate}</h3> */}
          <div className="input-group-stacked">
            <label className="label" htmlFor="comment">
              Leave a comment:
            </label>
            <textarea
              className="input input--full-width textarea"
              name="comment"
              onChange={handleInput}
              rows={4}
              required
              id="comment"
            ></textarea>
          </div>
          <button type="submit" className="button">
            Submit your score
          </button>
        </form>
      ) : null}

      {formSubmitted ? (
        <div>
          <h3>Form was submitted</h3>
        </div>
      ) : null}
    </div>
  );
};

export default SubmitForm;
