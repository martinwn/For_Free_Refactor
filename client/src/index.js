import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { injectGlobal } from "styled-components";
import App from "./App";
import IntroPage from "./components/Pages/IntroPage/IntroPage";
import registerServiceWorker from "./registerServiceWorker";

injectGlobal`

  html {
    height: 100%;
    font-size: 16px;
  }

  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: 'Ubuntu', sans-serif;
  }

  #root {
    height: 100%;
  }

  &:focus {
    outline: none !important;
  }

  a {
    text-decoration: none
  }

`;

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route path="/" component={App} />
      <Route exact path="/login" component={IntroPage} />
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
