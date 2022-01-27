import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import styles
import "./styles/App.scss";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
        <AuthProvider>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Home} />
        </Switch>
    </AuthProvider>
      </Router>
  );
}

export default App;
