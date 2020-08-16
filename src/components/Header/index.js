import React from "react";
import { auth } from "../../firebase/firebase.util";

const Header = ({ currentUser }) => {
  return (
    <header>
      Header
      {currentUser ? (
        <div>
          <div>{currentUser.displayName} (logged)</div>
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
