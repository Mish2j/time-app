import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ModalContextProvider } from "./store/modal-context";

ReactDOM.render(
  <React.StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
