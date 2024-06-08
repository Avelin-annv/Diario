import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import {
  CONFIG,
  LANDING_BTN_SUBTEXT,
  LANDING_BTN_TEXT,
  LANDING_HEADER,
  LANDING_NAVIGATE_BTN_TEXT,
  LANDING_NAVIGATE_URLS,
  LOADING,
} from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../store/userSlice";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { action } = useParams();
  const { userInfo, status, errors } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData =
      action === "signup"
        ? {
            name,
            email,
            password,
          }
        : {
            email,
            password,
          };
    dispatch(authenticateUser({ formData, action }));
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/notes");
    }
  }, [userInfo]);
  return (
    <div className="signup-container">
      {status === LOADING ? (
        <Loader />
      ) : (
        <div className="signup-wrapper">
          {errors && <Toast variant="danger" content={errors} />}
          <h1 className="text-center">{LANDING_HEADER[action]}</h1>
          <Form className="signup-form">
            {action === "signup" && (
              <Form.Group className="mb-3" controlId="formBasicuserName">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="current-password"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="text-center w-100"
              onClick={(e) => handleSubmit(e)}
            >
              {LANDING_BTN_TEXT[action]}
            </Button>
            <div className="my-4 text-center">
              <p>
                {LANDING_BTN_SUBTEXT[action]}{" "}
                <Link to={LANDING_NAVIGATE_URLS[action]} className="text-dark">
                  {LANDING_NAVIGATE_BTN_TEXT[action]}
                </Link>
              </p>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
