import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAHvUZdQDDh63nLHX-bjc6ioCHwQRmKwAs",
  authDomain: "sdsh-4a971.firebaseapp.com",
  databaseURL: "https://sdsh-4a971.firebaseio.com",
  projectId: "sdsh-4a971",
  storageBucket: "sdsh-4a971.appspot.com",
  messagingSenderId: "338962237581",
  appId: "1:338962237581:web:871ae61f90521730adfac4",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
