import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import MainContainer from "./MainContainer";
import Button from "react-bootstrap/esm/Button";
import { editUserDetails } from "../store/userSlice";
import { handleError } from "../utils/handleError";
import Toast from "./Toast";
import { FAILED, SUCCESS } from "../constants";

const Profile = () => {
  const [changePswd, setChangePswd] = useState(false);
  const { userInfo, errors, status } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [confPswd, setConfPswd] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (confPswd !== password) {
      return;
    }
    try {
      const formData = { name, email, password, prevPassword };
      dispatch(editUserDetails({ formData, id: userInfo._id }));
    } catch (e) {
      handleError(e);
    }
    setShowToast(true);
  };

  const setUserData = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  };
  useEffect(() => {
    userInfo && setUserData();
  }, [userInfo]);
  return (
    <MainContainer title={"Edit your profile"}>
      {showToast && status === FAILED && (
        <Toast variant={"danger"} content={errors} />
      )}
      {showToast && status === SUCCESS && (
        <Toast variant={"success"} content={"Edited successfully!"} />
      )}
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
            <Form.Group className="mb-3" controlId="newPswd1">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your user name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPswd2">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confPswd}
                onChange={(e) => setConfPswd(e.target.value)}
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
