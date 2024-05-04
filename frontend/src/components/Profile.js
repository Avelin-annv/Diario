import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import MainContainer from "./MainContainer";
import Button from "react-bootstrap/esm/Button";
import { editUserDetails } from "../store/userSlice";
import { handleError } from "../utils/handleError";

const Profile = () => {
  const [changePswd, setChangePswd] = useState(false);
  const { userInfo } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [password, setPassword] = useState("");
  console.log("name and email", name);
  const handleSave = (e) => {
    e.preventDefault();
    if (prevPassword !== password) {
      return;
    }
    try {
      const formData = { name, email, password };
      dispatch(editUserDetails({ formData, id: userInfo._id }));
    } catch (e) {
      handleError(e);
    }
  };

  const setUserData = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  };
  useEffect(() => {
    userInfo && setUserData();
  }, []);
  return (
    <MainContainer title={"Edit your profile"}>
      <Form className="profile-form">
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
                value={prevPassword}
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
          </>
        )}
        <Button type="submit" onClick={(e) => handleSave(e)}>
          Save changes
        </Button>
      </Form>
    </MainContainer>
  );
};

export default Profile;
