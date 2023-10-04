import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import AboutPage from "./pages/AboutPage";
import CounterPage from "./pages/CounterPage";
import GameSDSHPage from "./pages/GameSDSHPage";
import HighScorePage from "./pages/HighScorePage";
import InstructionsPage from "./pages/InstructionsPage";
import SecretPage from "./pages/SecretPage";
import GameMenu from "./components/GameMenu";
import "./App.scss";
import "./i18n";

const App: React.FC = observer(() => {
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
            <Routes>
              <Route path="/" element={<InstructionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/game" element={<GameSDSHPage />} />
              <Route path="/highscore" element={<HighScorePage />} />
              <Route path="/counter" element={<CounterPage />} />
              <Route path="/secret" element={<SecretPage />} />
            </Routes>
          </main>
        </Router>
      </div>
    </div>
  );
});

export default App;
