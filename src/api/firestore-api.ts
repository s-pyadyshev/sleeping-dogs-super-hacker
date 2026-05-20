import firebase from "firebase/compat/app";
import { firestore } from "../firebase/firebase.util";
import type { SubmitFormInterface } from "../interfaces/submit-form";
import type { GameStatsDoc, ScoreEntry } from "./types";

export const fetchScores = async (): Promise<ScoreEntry[]> => {
  const snapshot = await firestore.collection("scores").get();
  return snapshot.docs.map((doc) => doc.data() as ScoreEntry);
};

export const fetchGameStats = async (): Promise<GameStatsDoc> => {
  const doc = await firestore.collection("stats").doc("statsDoc").get();
  const data = doc.data();
  return {
    wins: data?.wins ?? 0,
    lost: data?.lost ?? 0,
  };
};

export const submitScore = async (userForm: SubmitFormInterface): Promise<void> => {
  await firestore.collection("scores").doc(userForm.username).set(userForm);
};

export const incrementStat = async (statName: string): Promise<void> => {
  await firestore
    .collection("stats")
    .doc("statsDoc")
    .update({
      [statName]: firebase.firestore.FieldValue.increment(1),
    });
};
