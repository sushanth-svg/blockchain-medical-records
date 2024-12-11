import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; // Optional if you have global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Mounts the app to the root DOM node in index.html
);
