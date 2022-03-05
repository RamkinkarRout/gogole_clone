import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ResutlContextProvider } from "./contexts/ResultContextProvider";

ReactDOM.render(
  <ResutlContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ResutlContextProvider>,

  document.getElementById("root")
);
