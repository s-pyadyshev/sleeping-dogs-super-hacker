import React, { useState, useEffect } from "react";
// import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import SignInAndSignUpPage from "./pages/sign-in-and-sign-up";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import GameSDSH from "./components/GameSDSH";
import { auth } from "./firebase/firebase.util";

import "./App.scss";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // The method onAuthStateChanged sets up a subscription by adding an observer for the user's sign-in state.
    // You only need to subscribe once when the component mounts and call unsubscribe when the component unmounts
    // to prevent the observer from running and causing memory leaks.
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // unscribe at will unmount to avoid memory leak
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <SignIn />
      <GameSDSH currentUser={currentUser} />
      {/* <Router>
        <Switch>
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
