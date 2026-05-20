import React, { useState, useEffect, useRef } from "react";
import { SubmitFormInterface } from "../../interfaces/submit-form";
import { useGame } from "../../contexts/GameProvider";
import "./style.scss";
import { useTranslation } from "react-i18next";
import {
  useIncrementStatMutation,
  useSubmitScoreMutation,
} from "../../hooks/queries";

const formatSubmitDate = (): string => {
  const today = new Date();
  return (
    today.getFullYear() +
    "." +
    (today.getMonth() + 1) +
    "." +
    today.getDate() +
    " " +
    "(" +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ")"
  );
};

const SubmitForm = () => {
  const { t } = useTranslation();
  const game = useGame();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userForm, setUserForm] = useState<SubmitFormInterface>(() => ({
    score: game.counter,
    attemptsUsed: game.attemptsUsed,
    code: [...game.code],
    username: "anonym",
    company: "unknown",
    date: formatSubmitDate(),
    comment: "no comments",
  }));
  const inputRef = useRef<HTMLInputElement>(null);
  const winsRecorded = useRef(false);
  const submitScoreMutation = useSubmitScoreMutation();
  const incrementStatMutation = useIncrementStatMutation();

  const submitUserScore = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitScoreMutation.mutate(userForm, {
      onSuccess: () => {
        setFormSubmitted(true);
        setTimeout(() => {
          document.location.href = "/";
        }, 3000);
      },
      onError: (error) => {
        console.error("Error writing document: ", error);
      },
    });
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.getAttribute("name");
    if (name) {
      setUserForm((prev) => ({
        ...prev,
        [name]: event.target.value,
      }));
    }
  };

  useEffect(() => {
    inputRef.current?.focus();

    if (!winsRecorded.current) {
      winsRecorded.current = true;
      incrementStatMutation.mutate("wins");
    }
    // Run once on mount only (mutate + focus).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="submit-form card">
      {!formSubmitted ? (
        <form onSubmit={submitUserScore}>
          <div className="input-group-stacked">
            <label htmlFor="username" className="label">
              {t("scoreForm.name")}:
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
            <h3>
              {t("scoreForm.number")}:&nbsp;
              <span className="label-value">{game.code}</span>
            </h3>
            <h3>
              {t("scoreForm.time")}:&nbsp;
              <span className="label-value">{userForm.score}s</span>
            </h3>
            <h3>
              {t("scoreForm.attempts")}:&nbsp;
              <span className="label-value">{userForm.attemptsUsed}</span>
            </h3>

            <h3>
              {t("scoreForm.date")}:&nbsp;
              <span className="label-value">{userForm.date}</span>
            </h3>
          </div>
          <div className="input-group-stacked">
            <label className="label" htmlFor="comment">
              {t("scoreForm.comment")}:
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
          <button type="submit" className="button button-primary">
            {t("scoreForm.submit")}
          </button>
        </form>
      ) : null}

      {formSubmitted ? (
        <div>
          <h3>{t("scoreForm.submitted")}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default SubmitForm;
