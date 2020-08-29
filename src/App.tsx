import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import CounterPage from "./pages/CounterPage";
import HighScorePage from "./pages/HighScorePage";
import GameSDSH from "./components/GameSDSH";
import GameOver from "./components/GameOver";
import GameMenu from "./components/GameMenu";
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

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sleeping Dogs Super Hacker</title>
      </Helmet>
      <div className="container">
        <Router>
          <Switch>
            <Route path="/" exact>
              <GameMenu />
              {/* TODO Refactor conditions */}
              {gameSDSHStore.isGameStarted === true ? (
                <GameSDSH {...currentUser} />
              ) : null}

              {gameSDSHStore.isGameOver === true &&
              gameSDSHStore.isGameStarted === false ? (
                <GameOver />
              ) : null}
            </Route>
            <Route path="/counter" component={CounterPage} />
            <Route path="/highscore" component={HighScorePage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
});

export default App;
