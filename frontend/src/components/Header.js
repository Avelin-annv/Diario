import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../store/userSlice";
import Badge from "react-bootstrap/esm/Badge";
import { NOTES_LOCATION } from "../constants";

const Header = ({ searchText, setSearchText }) => {
  const dispatch = useDispatch();
  let location = useLocation();
  const { userInfo } = useSelector((store) => store.user);
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutUser);
  };
  console.log("loccc", location);
  return (
    <Navbar expand="lg" className="bg-primary" variant="dark">
      <Container>
        <Navbar.Brand href="#">
          <Link to={"/notes"}>Diario</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {userInfo && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Form inline className="header-search">
                <Row>
                  {location.pathname === NOTES_LOCATION && (
                    <Col xs="auto" className="w-100">
                      <Form.Control
                        type="text"
                        value={searchText}
                        placeholder="Search for what you've left off"
                        className=" mr-sm-2"
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </Col>
                  )}
                </Row>
              </Form>
            </Nav>
            <Nav className="">
              <Nav.Link href="#">
                <Badge pill>New!</Badge>
                <Link to="/draw/create" className="h5">
                  Draw 🎨
                </Link>
              </Nav.Link>

              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="#">
                  <Link to={"/userProfile"} className="text-black">
                    Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item href="/" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
