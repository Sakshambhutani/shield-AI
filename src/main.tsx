import React from "react";
import ReactDOM from "react-dom/client";
import App from "./strategy/Shell";
import "@xyflow/react/dist/style.css";
import "./styles.css";
import "./strategy/strategy.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
