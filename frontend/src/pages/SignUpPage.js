import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css";
import axios from "axios";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import {
  CONFIG,
  LANDING_BTN_SUBTEXT,
  LANDING_BTN_TEXT,
  LANDING_HEADER,
  LANDING_NAVIGATE_BTN_TEXT,
  LANDING_NAVIGATE_URLS,
  LANDING_URLS,
} from "../constants";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const { action } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
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
      const { data } = await axios.post(LANDING_URLS[action], formData, CONFIG);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/home");
    } catch (e) {
      setErrors(e?.message);
    }
    setLoading(false);
  };
  return (
    <div className="signup-container">
      {loading ? (
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
                <Link to={LANDING_NAVIGATE_URLS[action]}>
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
