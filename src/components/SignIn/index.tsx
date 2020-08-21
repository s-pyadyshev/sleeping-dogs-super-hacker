import React from "react";
import Button from "@material-ui/core/Button";
import { signInWithGoogle } from "../../firebase/firebase.util";

const SignIn = () => {
  return (
    <div className="sign-in">
      <h2>Sign in with Google</h2>

      <Button type="submit" onClick={signInWithGoogle}>
        Sign in
      </Button>
    </div>
  );
};

export default SignIn;
