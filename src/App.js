import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up";
import Header from "./components/Header";
import GameSDSH from "./components/GameSDSH";
import { auth } from "./firebase/firebase.util";

import "./App.scss";

let unsubscribeFromAuth = () => null;

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      // unscribe at will unmount to avoid memory leak
      return () => {
        unsubscribeFromAuth();
      };
    });
  }, []);

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <GameSDSH />
      <Router>
        <Switch>
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
