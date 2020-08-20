import React, { useState, useEffect } from "react";
// import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import SignInAndSignUpPage from "./pages/sign-in-and-sign-up";
import { observer } from "mobx-react";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import GameSDSH from "./components/GameSDSH";
import Scoreboard from "./components/Scoreboard";
import GameOver from "./components/GameOver";
import { auth } from "./firebase/firebase.util";
import { useStores } from "./hooks/use-stores";

import "./App.scss";

const App: React.FC = observer(() => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { gameSDSHStore } = useStores();

  useEffect(() => {
    // The method onAuthStateChanged sets up a subscription by adding an observer for the user's sign-in state.
    // You only need to subscribe once when the component mounts and call unsubscribe when the component unmounts
    // to prevent the observer from running and causing memory leaks.
    // TODO: Firestore google auth is broken currently
    const unsubscribeFromAuth = auth.onAuthStateChanged((user: any) => {
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

  const handleClick = () => {
    gameSDSHStore.gameStart();
  };

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <SignIn />

      {gameSDSHStore.isGameStarted === true ? (
        <GameSDSH {...currentUser} />
      ) : null}

      {gameSDSHStore.isGameOver === true &&
      gameSDSHStore.isGameStarted === false ? (
        <GameOver />
      ) : null}

      {!gameSDSHStore.isGameStarted === true ? (
        <button onClick={handleClick}>Start</button>
      ) : null}

      <Scoreboard />
      {/* <Router>
        <Switch>
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </Router> */}
    </div>
  );
});

export default App;
