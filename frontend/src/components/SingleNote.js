import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import MainContainer from "./MainContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewNote,
  editNote,
  fetchNoteById,
  clearSelectedNote,
  deleteNote,
} from "../store/notesSlice";
import { useNavigate, useParams } from "react-router-dom";
import { NOTE_HEADERS } from "../constants";
import { handleError } from "../utils/handleError";

const SingleNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { action, id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const { selectedNote } = useSelector((store) => store.note);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        dispatch(deleteNote(id));
        navigate("/mynotes");
      } catch (e) {
        handleError(e);
      }
    }
  };
  const fetchNoteInfo = async () => {
    dispatch(fetchNoteById(id));
  };

  const handlesubmit = () => {
    try {
      const formData = { title, category, content };
      action === "create"
        ? dispatch(createNewNote(formData))
        : dispatch(editNote({ formData, id }));
      navigate("/notes");
    } catch (e) {}
  };
  const resetFields = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  useEffect(() => {
    if (action === "edit") fetchNoteInfo();
    return () => {
      dispatch(clearSelectedNote());
    };
  }, []);
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setCategory(selectedNote.category);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);
  return (
    <MainContainer title={NOTE_HEADERS[action]}>
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
          <Card.Footer className="flex justify-between">
            <Button variant="primary" onClick={handlesubmit}>
              Save
            </Button>
            <Button variant="warning" onClick={resetFields}>
              Reset fields
            </Button>
            {action === "edit" && (
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => handleDelete(id)}
              >
                Delete
              </Button>
            )}
          </Card.Footer>
        </Card.Body>
      </Card>
    </MainContainer>
  );
};

export default SingleNote;
