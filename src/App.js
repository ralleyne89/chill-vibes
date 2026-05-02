import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
// import styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Redirect to="/" />
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
