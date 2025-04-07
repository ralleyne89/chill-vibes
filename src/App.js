import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import styles
import "./styles/App.scss";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Home} />
          </Switch>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
