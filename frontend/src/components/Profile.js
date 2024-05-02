import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import MainContainer from "./MainContainer";
import Button from "react-bootstrap/esm/Button";

const Profile = () => {
  const [changePswd, setChangePswd] = useState(false);
  const { userInfo } = useSelector((store) => store.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prevpassword, setPrevPassword] = useState("");
  const [password, setPassword] = useState("");
  const handleSave = (e) => {
    e.preventDefault();
    if (prevpassword !== password) {
      return;
      // throw new Error("Passwords do not match");
    }
  };
  return (
    <MainContainer title={"Edit your profile"}>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter your user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Do you want to change password ?"
            onChange={(e) => setChangePswd(e.target.checked)}
          />
        </Form.Group>
        {changePswd && (
          <>
            <Form.Group className="mb-3" controlId="oldpswd">
              <Form.Label>Old password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your current password"
                value={prevpassword}
                onChange={(e) => setPrevPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPswd">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your user name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" onClick={(e) => handleSave(e)}>
              Save changes
            </Button>
          </>
        )}
      </Form>
    </MainContainer>
  );
};

export default Profile;
