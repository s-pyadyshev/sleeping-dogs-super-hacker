import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirebaseConfig, isFirebaseConfigured } from "./firebase-env";

const firebaseConfig = getFirebaseConfig();

if (import.meta.env.DEV && !isFirebaseConfigured()) {
  console.warn(
    "[Firebase] Missing config. Set VITE_FIREBASE_* variables in .env (see .env.example). " +
      "After migrating from Create React App, rename REACT_APP_FIREBASE_* to VITE_FIREBASE_*."
  );
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
