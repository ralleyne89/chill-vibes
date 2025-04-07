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

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { login } = useAuth();

  // FUNCTION TO HANDLE LOGIN SUBMIT FOR FORM
  const handleSubmit = async (e) => {
    // PREVENT FORM FROM REFRESHING
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError("Failed to sign in: " + (error.message || ""));
    }
    setLoading(false);
  };

  return (
    <Row>
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
                  Vibe out to your playlist 🎵 <br /> Sign Up Now
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
                      onClick={() => history.push("/signup")}
                    >
                      Sign Up
                    </Button>
                  </Col>
                  <Col></Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Col>
      <Col>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card className="card-shadow">
              <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
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
                  <br />
                  <Button className="w-100" type="submit" disabled={loading}>
                    Login
                  </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                  <Link to="/signup">Need an account? Sign Up</Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default Login;
