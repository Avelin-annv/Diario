import React, { useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCanvasById,
  fetchAllCanvas,
  fetchCanvasById,
} from "../store/canvasSlice";

const DrawList = () => {
  const { canvases, errors, status, selectedCanvas } = useSelector(
    (store) => store.canvas
  );
  const dispatch = useDispatch();
  const getAllCanvas = async () => {
    dispatch(fetchAllCanvas());
  };
  const handleViewCanvas = (id) => {
    dispatch(fetchCanvasById(id));
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this draw?"))
      dispatch(deleteCanvasById(id));
  };
  useEffect(() => {
    getAllCanvas();
  }, []);

  return (
    <>
      {canvases.length > 0 ? (
        <>
          {canvases?.map((canvas) => (
            <Card
              key={canvas._id}
              className={
                selectedCanvas?._id === canvas?._id ? "selected-canvas" : ""
              }
            >
              <Row className="accordion-header">
                <Col lg={10}>
                  <Card.Header>
                    <p>{canvas.title}</p>
                  </Card.Header>
                </Col>

                <Col>
                  <div className=" mx-2">
                    <Button
                      variant="primary"
                      className="mx-2"
                      onClick={() => handleViewCanvas(canvas._id)}
                    >
                      View
                    </Button>

                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => handleDelete(canvas._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>

              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <footer className="blockquote-footer">
                    Created on{" "}
                    <span>{canvas?.createdAt?.substring(0, 10)}</span>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        <h3>Your drawing list is empty! Create one</h3>
      )}
    </>
  );
};

export default DrawList;
