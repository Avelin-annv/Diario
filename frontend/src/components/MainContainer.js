import React from "react";
import Container from "react-bootstrap/esm/Container";
import "../index.css";

const MainContainer = ({ title, children }) => {
  return (
    <div className="main-container">
      <Container className="my-4">
        {title && <h1 className="">{title}</h1>}
        <hr />
        {children}
      </Container>
    </div>
  );
};

export default MainContainer;
