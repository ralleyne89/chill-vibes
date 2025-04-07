import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import styles
import "./styles/App.scss";
import Home from "./pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
