import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";
import Background from "../images/background.png";
import Nero from "../images/nero.png";
import { useHistory, Link, useLocation } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const location = useLocation();
  const {
    authError,
    authLoading,
    clearAuthError,
    clearStoredGoogleRedirectPath,
    currentUser,
    getStoredGoogleRedirectPath,
    isFirebaseConfigured,
    login,
    missingFirebaseConfig,
    signInWithGoogle,
  } = useAuth();
  const redirectPath =
    getStoredGoogleRedirectPath() || location.state?.from?.pathname || "/";

  useEffect(() => {
    if (authError) {
      setError(getAuthErrorMessage(authError, "Failed to finish Google sign-in"));
    }
  }, [authError]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    clearStoredGoogleRedirectPath();
    history.replace(redirectPath);
  }, [clearStoredGoogleRedirectPath, currentUser, history, redirectPath]);

  // FUNCTION TO HANDLE LOGIN SUBMIT FOR FORM
  const handleSubmit = async (e) => {
    // PREVENT FORM FROM REFRESHING
    e.preventDefault();
    try {
      setError("");
      clearAuthError();
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      clearStoredGoogleRedirectPath();
      setLoading(false);
      history.replace(redirectPath);
    } catch (error) {
      setError(getAuthErrorMessage(error, "Failed to sign in"));
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      clearAuthError();
      setLoading(true);
      const result = await signInWithGoogle(redirectPath);
      if (result?.status === "redirect") {
        return;
      }
      if (result?.credential?.user) {
        clearStoredGoogleRedirectPath();
        setLoading(false);
        history.replace(redirectPath);
      }
    } catch (error) {
      setError(getAuthErrorMessage(error, "Failed to sign in with Google"));
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
          <img
            className="auth-mascot"
            src={Nero}
            alt=""
            aria-hidden="true"
          />
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
              disabled={loading || authLoading || !isFirebaseConfigured}
            >
              Login
            </Button>
          </Form>
          <div className="auth-divider" aria-hidden="true">
            <span>or continue with</span>
          </div>
          <Button
            className="google-auth-button"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || authLoading || !isFirebaseConfigured}
          >
            <span className="google-mark" aria-hidden="true">
              G
            </span>
            <span>Sign in with Google</span>
          </Button>
          <p className="auth-link">
            Need an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
