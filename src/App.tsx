import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import AboutPage from "./pages/AboutPage";
import CounterPage from "./pages/CounterPage";
import GameSDSHPage from "./pages/GameSDSHPage";
import HighScorePage from "./pages/HighScorePage";
import InstructionsPage from "./pages/InstructionsPage";
import GameMenu from "./components/GameMenu";
import { useStores } from "./hooks/use-stores";
// import { auth } from "./firebase/firebase.util";

import "./App.scss";

const App: React.FC = observer(() => {
  const { gameSDSHStore } = useStores();
  // useEffect(() => {
  // The method onAuthStateChanged sets up a subscription by adding an observer for the user's sign-in state.
  // You only need to subscribe once when the component mounts and call unsubscribe when the component unmounts
  // to prevent the observer from running and causing memory leaks.
  // TODO: Firestore google auth is broken currently
  // const unsubscribeFromAuth = auth.onAuthStateChanged((user: any) => {
  //   if (user) {
  //     setCurrentUser(user);
  //   } else {
  //     setCurrentUser(null);
  //   }
  // });
  // unscribe at will unmount to avoid memory leak
  // return () => {
  //   unsubscribeFromAuth();
  // };
  // }, []);

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sleeping Dogs Super Hacker</title>
      </Helmet>
      <div className="container">
        <Router>
          {gameSDSHStore.isGameStarted === false ||
          gameSDSHStore.isUnlocked === true ? (
            <aside className="aside">
              <GameMenu />
            </aside>
          ) : null}

          <main className="main">
            <Switch>
              <Route path="/" exact component={InstructionsPage} />
              <Route path="/about" exact component={AboutPage} />
              <Route path="/game" exact component={GameSDSHPage} />
              <Route path="/highscore" exact component={HighScorePage} />
              <Route path="/counter" exact component={CounterPage} />
            </Switch>
          </main>
        </Router>
      </div>
    </div>
  );
});

export default App;
