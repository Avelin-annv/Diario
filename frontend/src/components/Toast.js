import React from "react";
import Alert from "react-bootstrap/Alert";

const Toast = ({ variant, content }) => {
  return (
    <div>
      <Alert key={variant} variant={variant}>
        {content}
      </Alert>
    </div>
  );
};

export default Toast;
