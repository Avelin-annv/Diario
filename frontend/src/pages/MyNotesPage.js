import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import MainContainer from "../components/MainContainer";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, fetchAllNotes } from "../store/notesSlice";
import { LOADING } from "../constants";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import { handleError } from "../utils/handleError";

const MyNotesPage = () => {
  const dispatch = useDispatch();
  const { notes, status, errors } = useSelector((store) => store.note);
  const [searchText] = useOutletContext();
  const searchNotes = (item) => {
    return (
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const getNoteData = async () => {
    dispatch(fetchAllNotes());
  };
  useEffect(() => {
    getNoteData();
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        dispatch(deleteNote(id));
      } catch (e) {
        handleError(e);
      }
    }
  };
  return (
    <MainContainer title={"Your notes"}>
      {errors && <Toast variant="danger" content={errors} />}
      {status === LOADING ? (
        <Loader />
      ) : (
        <>
          <Button className="my-4" size="lg">
            <Link to="/note/new/create" text>
              {" "}
              Create new Note
            </Link>
          </Button>

          <Accordion className="">
            {notes.filter(searchNotes).map((note, index) => (
              <Accordion.Item eventKey={index} key={note._id} className="my-2">
                <Card>
                  <Accordion.Header>
                    <div className="accordion-header">
                      <Card.Header>
                        <p>{note.title}</p>
                      </Card.Header>

                      <div className=" mx-2">
                        <Button variant="primary" className="mx-2">
                          <Link to={`/note/${note._id}/edit`}>Edit</Link>
                        </Button>

                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => handleDelete(note._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Card.Body>
                      <Badge bg="info">
                        {note.category ? note.category : "default"}
                      </Badge>
                      <blockquote className="blockquote mb-0">
                        <p> {note.content}</p>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <span>{note?.createdAt.substring(0, 10)}</span>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Body>
                </Card>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      )}
    </MainContainer>
  );
};
export default MyNotesPage;
