import { AppRoot } from "@dynatrace/strato-components-preview";
import React from "react"; // the react itself
import ReactDOM from "react-dom"; // browser DOM, others: react-native, next.js (SSR), react 360 (AR/VR)
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";

// react v17 - dt-app
// react v18 - majority of community is on

ReactDOM.render(
  <AppRoot>
    <BrowserRouter basename="ui">
      <App />
    </BrowserRouter>
  </AppRoot>,
  document.getElementById("root")
);
