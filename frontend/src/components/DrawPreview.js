import React, { useEffect } from "react";
import Konva from "konva";
import MainContainer from "./MainContainer";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import DrawList from "./DrawList";
import { useDispatch, useSelector } from "react-redux";
import { addDefaultSelectedCanvas } from "../store/canvasSlice";
import { Link } from "react-router-dom";

const DrawPreview = () => {
  const dispatch = useDispatch();
  const { canvases, selectedCanvas } = useSelector((store) => store.canvas);
  useEffect(() => {
    dispatch(addDefaultSelectedCanvas());
  }, [canvases]);
  useEffect(() => {
    if (selectedCanvas) {
      Konva.Node.create(selectedCanvas.canvasJson, "canvas-container");
    }
  }, [selectedCanvas]);
  return (
    <MainContainer title={"View your drawings"} className="bg-black">
      <Row className="d-flex">
        <Col>
          <Link to="/draw/create">
            <Button className="m-2 px-4">+ Create New!</Button>
          </Link>
        </Col>
        <Col>{selectedCanvas && <h2>{selectedCanvas.title}</h2>}</Col>
      </Row>
      <Row>
        <Col>
          <DrawList />
        </Col>

        <Col lg={9}>
          {canvases?.length > 0 && (
            <div className=" canvas-preview" id="canvas-container" />
          )}
        </Col>
      </Row>
    </MainContainer>
  );
};

export default DrawPreview;
