import React from "react";
import "./landingPage.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="main-landing">
      <Container>
        <Row>
          <div className="text-center">
            <h1>Welcome to Diario</h1>
            <h2>Jot down ideas!</h2>
          </div>
          <div className="text-center m-2">
            <Button className="m-2" onClick={() => navigate(`/login`)}>
              Login
            </Button>
            <Button
              className="m-2"
              variant="outline-primary"
              onClick={() => navigate(`/signup`)}
            >
              Sign up
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
