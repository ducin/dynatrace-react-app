import { AppRoot } from "@dynatrace/strato-components-preview";
import React from "react"; // the react itself
import ReactDOM from "react-dom"; // browser DOM, others: react-native, next.js (SSR), react 360 (AR/VR)
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { CurrencyProvider } from "./itcorpo/providers/Currencies";

// react v17 - dt-app
// react v18 - majority of community is on

// AppProviders.tsx
const AppProviders: React.FC = ({ children }) => {
  return (
    <AppRoot>
      <BrowserRouter basename="ui">
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </BrowserRouter>
    </AppRoot>
  )
}

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);

// pre-render - SSR (server-side rendering)
// SSG (static site generation)
// client-side rendering (CSR)