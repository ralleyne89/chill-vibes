import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";
import Background from "../images/background.png";
import Nero from "../images/nero.png";
import { useHistory, Link, useLocation } from "react-router-dom";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
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
    missingFirebaseConfig,
    signInWithGoogle,
    signup,
  } = useAuth();
  const redirectPath =
    getStoredGoogleRedirectPath() || location.state?.from?.pathname || "/";

  useEffect(() => {
    if (authError) {
      setError(getAuthErrorMessage(authError, "Failed to finish Google sign-up"));
    }
  }, [authError]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    clearStoredGoogleRedirectPath();
    history.replace(redirectPath);
  }, [clearStoredGoogleRedirectPath, currentUser, history, redirectPath]);

  // FUNCTION TO HANDLE SIGNUP SUBMIT FOR FORM
  const handleSubmit = async (e) => {
    // PREVENT FORM FROM REFRESHING
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      clearAuthError();
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      clearStoredGoogleRedirectPath();
      setLoading(false);
      history.replace(redirectPath);
    } catch (error) {
      setError(getAuthErrorMessage(error, "Failed to create an account"));
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
      setError(getAuthErrorMessage(error, "Failed to continue with Google"));
      setLoading(false);
    }
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <main className="auth-screen reverse">
      <section className="auth-form-section" aria-labelledby="signup-heading">
        <div className="auth-card">
          <p className="auth-kicker">Start Listening</p>
          <h2 id="signup-heading">Sign Up</h2>
          {!isFirebaseConfigured && (
            <Alert variant="warning">
              Firebase is not configured. Add the required values to
              <code> .env.local </code>
              before creating an account: {missingFirebaseConfig.join(", ")}.
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
            <Form.Group id="password-confirm" className="auth-field">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button
              className="auth-submit"
              type="submit"
              disabled={loading || authLoading || !isFirebaseConfigured}
            >
              Sign Up
            </Button>
          </Form>
          <div className="auth-divider" aria-hidden="true">
            <span>or continue with</span>
          </div>
          <Button
            className="google-auth-button"
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading || authLoading || !isFirebaseConfigured}
          >
            <span className="google-mark" aria-hidden="true">
              G
            </span>
            <span>Sign up with Google</span>
          </Button>
          <p className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>

      <section
        className="auth-visual"
        style={{ "--auth-background": `url(${Background})` }}
      >
        <div className="auth-visual-panel">
          <p>Chill Vibes</p>
          <h1>Keep every late-night mix close.</h1>
          <Button type="button" variant="outline-light" onClick={handleLogin}>
            Login
          </Button>
          <img
            className="auth-mascot"
            src={Nero}
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>
    </main>
  );
};

export default SignUp;
