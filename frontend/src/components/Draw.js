import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import MainContainer from "./MainContainer";
import Button from "react-bootstrap/esm/Button";
import { BLACK_HEX, CANVAS_RATIO, DEFAULT_STAGE_WIDTH } from "../constants";
import { useDispatch } from "react-redux";
import { createNewCanvas } from "../store/canvasSlice";
import { handleError } from "../utils/handleError";
import { Link, useNavigate } from "react-router-dom";

const Draw = () => {
  const canvasStageRef = useRef(null);
  const isDrawing = React.useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState(BLACK_HEX);
  const [title, setTitle] = useState("");
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);

  const handleSaveCanvas = () => {
    try {
      const canvasJson = canvasStageRef.current.toJSON();
      if (canvasJson) dispatch(createNewCanvas({ canvasJson, title }));
      navigate("/draw/preview");
    } catch (e) {
      handleError(e);
    }
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
  const handleResize = () => {
    let newscale = (CANVAS_RATIO * window.innerWidth) / DEFAULT_STAGE_WIDTH;
    setScale(newscale);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
                <option value="pen">Draw</option>
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
            <Col md={6}>
              <Link to="/draw/preview">
                <Button className="p-4 my-1">View your drawings</Button>
              </Link>
            </Col>
          </Row>

          <div className="canvas-wrapper" id="canvas-container">
            <Stage
              ref={canvasStageRef}
              scaleX={scale}
              scaleY={scale}
              width={CANVAS_RATIO * window.innerWidth}
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
      </Row>
    </MainContainer>
  );
};

export default Draw;
