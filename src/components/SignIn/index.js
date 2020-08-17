import React from "react";
import Button from "@material-ui/core/Button";
import { signInWithGoogle } from "../../firebase/firebase.util";

const SignIn = () => {
  // const [signInData, setSignInData] = useState({});

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   setSignInData({ email: "", password: "" });
  // };

  // const handleChange = (event) => {
  //   const { value, name } = event.target;

  //   setSignInData({ [name]: value });
  // };

  return (
    <div className="sign-in">
      <h2>Sign in with Google</h2>

      {/* <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={signInData.email}
          label="email"
          required
        />
        <input
          name="password"
          type="password"
          value={signInData.password}
          onChange={handleChange}
          label="password"
          required
        />
      </form> */}
      <Button type="submit" onClick={signInWithGoogle}>
        Sign in
      </Button>
    </div>
  );
};

export default SignIn;
