import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { QueryProvider } from "./providers/QueryProvider";
import { GameProvider } from "./contexts/GameProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </QueryProvider>
  </React.StrictMode>
);
