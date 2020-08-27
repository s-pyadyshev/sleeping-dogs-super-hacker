import React from "react";
import { signInWithGoogle } from "../../firebase/firebase.util";

const SignIn = () => {
  return (
    <div className="sign-in">
      <h2>Sign in with Google</h2>

      <button type="submit" onClick={signInWithGoogle}>
        Sign in
      </button>
    </div>
  );
};

export default SignIn;
