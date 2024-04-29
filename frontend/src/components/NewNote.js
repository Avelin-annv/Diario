import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import MainContainer from "./MainContainer";
import { useDispatch } from "react-redux";
import { createNewNote } from "../store/notesSlice";

const NewNote = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const createNote = () => {
    dispatch(createNewNote({ title, category, content }));
  };
  return (
    <MainContainer title={"create new note"}>
      <Card>
        <Card.Body>
          <Card.Title>Jot down ideas</Card.Title>
          <Card.Text>
            <Form>
              <Form.Group className="mb-3" controlId="notecategory">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Enter your note's title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="notecategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Enter your note's category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="notecontent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  type="string"
                  rows={8}
                  placeholder="Start writing down!"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              {content && (
                <Card>
                  <Card.Header>Preview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}
            </Form>
          </Card.Text>
          <Button variant="primary" onClick={createNote}>
            Save
          </Button>
        </Card.Body>
      </Card>
    </MainContainer>
  );
};

export default NewNote;
