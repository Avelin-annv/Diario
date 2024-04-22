import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MainContainer from "../components/MainContainer";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "../App.css";

const MyNotesPage = () => {
  const [notesData, setNotesData] = useState();
  const fetchNotesData = async () => {
    try {
      const data = await axios.get("api/notes");
      setNotesData(data.data.notes);
      console.log(data, "fetchs");
    } catch (e) {
      console.error(" error occured during fetch", e.response.data);
    }
  };
  useEffect(() => {
    fetchNotesData();
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?"))
      console.log("delete note");
  };
  return (
    <MainContainer title={"Your notes"}>
      <>
        <Button className="my-4" size="lg">
          Create new Note
        </Button>
        <Accordion className="">
          {notesData?.map((note, index) => (
            <Accordion.Item eventKey={index} key={note.id} className="my-2">
              <Card>
                <Accordion.Header>
                  <div className="accordion-header">
                    <Card.Header>
                      <p>{note.title}</p>
                    </Card.Header>

                    <div className=" mx-2">
                      <Link to={`/note/${note.id}`}>
                        <Button variant="primary" className="mx-2">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => handleDelete(note.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Card.Body>
                    <Badge bg="info">{note.category}</Badge>
                    <blockquote className="blockquote mb-0">
                      <p> {note.content}</p>
                      <footer className="blockquote-footer">
                        Created on <span>22-08-1999</span>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          ))}
        </Accordion>
      </>
    </MainContainer>
  );
};
export default MyNotesPage;
