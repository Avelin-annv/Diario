import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <Spinner animation="grow" size="xl" />
      <Spinner animation="grow" size="xl" />
      <Spinner animation="grow" size="xl" />
    </div>
  );
};

export default Loader;
