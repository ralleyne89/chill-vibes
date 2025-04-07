import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Nero from "../images/nero.png";
import Background from "../images/background.png";
import { useHistory, Link } from "react-router-dom";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();
  const { signup } = useAuth();
  // FUNCTION TO HANDLE SIGNUP SUBMIT FOR FORM
  const handleSubmit = async (e) => {
    // PREVENT FORM FROM REFRESHING
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError("Failed to create an account: " + (error.message || ""));
    }
    setLoading(false);
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <Row>
      <Col>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card className="card-shadow">
              <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Button className="w-100" type="submit" disabled={loading}>
                    Sign Up
                  </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                  <Link to="/login">Already have an account? Login</Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Col>
      <Col style={{ background: `url(${Background})` }}>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card
              className="glass-effect"
              style={{ minHeight: "350px", padding: 20 }}
            >
              <Card.Body>
                <h2 style={{ color: "#fff", lineHeight: 1.5 }}>
                  Vibe out to your playlist 🎵 <br /> Login Now
                </h2>
                <img
                  src={Nero}
                  style={{
                    width: 320,
                    position: "absolute",
                    right: -115,
                    bottom: -20,
                  }}
                  alt=""
                />
                <Row
                  className="align-items-end justify-items-end"
                  style={{ marginTop: "30%" }}
                >
                  <Col>
                    <Button
                      style={{ borderRadius: 50 }}
                      variant="outline-light"
                      className="w-100"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </Col>
                  <Col></Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUp;
