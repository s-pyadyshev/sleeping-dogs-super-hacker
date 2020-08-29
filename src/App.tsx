import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import CounterPage from "./pages/CounterPage";
import GameSDSHPage from "./pages/GameSDSHPage";
import HighScorePage from "./pages/HighScorePage";
import GameMenu from "./components/GameMenu";
// import { auth } from "./firebase/firebase.util";

import "./App.scss";

const App: React.FC = observer(() => {
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
          <aside className="aside">
            <GameMenu />
          </aside>
          <main className="main">
            <Switch>
              <Route path="/game" component={GameSDSHPage} />
              <Route path="/highscore" component={HighScorePage} />
              <Route path="/counter" component={CounterPage} />
            </Switch>
          </main>
        </Router>
      </div>
    </div>
  );
});

export default App;
