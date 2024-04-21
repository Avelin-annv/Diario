import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        bottom: "0",
        position: "relative",
      }}
    >
      <Container className="text-center">
        <Row>
          <Col className="text-cener py-3">Made with ❤️</Col>
        </Row>
        <Row>
          <Col className="text-cener py-3">Copyright &copy; Diario</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
