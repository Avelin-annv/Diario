import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import Konva from "konva";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import MainContainer from "./MainContainer";
import Button from "react-bootstrap/esm/Button";
import DrawList from "./DrawList";
import { imgJson } from "../imgData";
import { BLACK_HEX } from "../constants";

const Draw = () => {
  const canvasStageRef = useRef(null);
  const [color, setColor] = useState(BLACK_HEX);
  const [title, setTitle] = useState("");
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
  const handleSaveCanvas = () => {
    const drawing = canvasStageRef.current.toJSON();
    console.log(drawing, "drawing");
  };
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  useEffect(() => {
    Konva.Node.create(imgJson, "canvas-container");
  }, []);
  return (
    <MainContainer title={"Create your drawings"} className="bg-black">
      <Row>
        <Col lg={9} sm={"auto"}>
          <Row>
            <Col lg={1}>
              <select
                value={tool}
                onChange={(e) => {
                  setTool(e.target.value);
                }}
              >
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
              </select>
            </Col>
            <Col>
              <Form.Control
                type="color"
                id="exampleColorInput"
                defaultValue={BLACK_HEX}
                title="Choose your color"
                onInput={(e) => setColor(e.target.value)}
                onChange={(e) => setColor(e.target.value)}
              />
            </Col>
          </Row>
          <div className="canvas-wrapper" id="canvas-container">
            {/* <Container ></Container> */}
            <Stage
              ref={canvasStageRef}
              width={900}
              height={window.innerHeight}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      line.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                ))}
              </Layer>
            </Stage>
          </div>
          <Form inline className="m-2">
            <Row>
              <Col xs="auto" className="w-50">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Drawing title"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Drawing title"
                    className=" mr-sm-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col xs="auto" className="w-50">
                <Button className="btn-lg" onClick={handleSaveCanvas}>
                  Save changes
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col>
          <DrawList />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Draw;
