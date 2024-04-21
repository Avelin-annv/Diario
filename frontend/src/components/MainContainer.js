import React from "react";
import Container from "react-bootstrap/esm/Container";

const MainContainer = ({ title, children }) => {
  return (
    <div>
      <Container>
        {title && <div className="text-center"></div>}
        {children}
      </Container>
    </div>
  );
};

export default MainContainer;
