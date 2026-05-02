import React, { useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Background from "../images/background.png";
import { useHistory, Link, Redirect, useLocation } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const location = useLocation();
  const { currentUser, isFirebaseConfigured, login, missingFirebaseConfig } =
    useAuth();
  const redirectPath = location.state?.from?.pathname || "/";

  if (currentUser) {
    return <Redirect to={redirectPath} />;
  }

  // FUNCTION TO HANDLE LOGIN SUBMIT FOR FORM
  const handleSubmit = async (e) => {
    // PREVENT FORM FROM REFRESHING
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.replace(redirectPath);
    } catch (error) {
      setError("Failed to sign in: " + (error.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-screen">
      <section
        className="auth-visual"
        style={{ "--auth-background": `url(${Background})` }}
      >
        <div className="auth-visual-panel">
          <p>Chill Vibes</p>
          <h1>Save your favorite chill sessions.</h1>
          <Button
            type="button"
            variant="outline-light"
            onClick={() => history.push("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </section>

      <section className="auth-form-section" aria-labelledby="login-heading">
        <div className="auth-card">
          <p className="auth-kicker">Welcome Back</p>
          <h2 id="login-heading">Login</h2>
          {!isFirebaseConfigured && (
            <Alert variant="warning">
              Firebase is not configured. Add the required values to
              <code> .env.local </code>
              before signing in: {missingFirebaseConfig.join(", ")}.
            </Alert>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="auth-field">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="auth-field">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button
              className="auth-submit"
              type="submit"
              disabled={loading || !isFirebaseConfigured}
            >
              Login
            </Button>
          </Form>
          <p className="auth-link">
            Need an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
