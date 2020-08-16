import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { signInWithGoogle } from "../../firebase/firebase.util";

const SignIn = () => {
  const [signInData, setSignInData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    setSignInData({ email: "", password: "" });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setSignInData({ [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          handleChange={handleChange}
          value={signInData.email}
          label="email"
          required
        />
        <input
          name="password"
          type="password"
          value={signInData.password}
          handleChange={handleChange}
          label="password"
          required
        />
        <Button type="submit" onClick={signInWithGoogle}>
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
