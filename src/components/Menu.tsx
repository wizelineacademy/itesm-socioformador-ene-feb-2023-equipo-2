import React, { useState, Fragment  } from "react";
import Image from "next/image";
import {
  Navbar,
  Nav,
  Button,
  Modal,
  Container,
  NavDropdown,
} from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import logoBtn from "src/images/logoSearch.jpg";
import styles from "src/components/Menu.module.css";

interface MenuProps {
  titulo: string;
  descripcion: string;
}

const Menu = (props: MenuProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    window.location.href = "/";
  };

  return (
    <>
      {/* Navbar component */}
      <Navbar className="border-bottom">
        <Container>
          <Navbar.Brand>
            {/* Image component */}
            <Image src={logoBtn} height={40} alt="Logo Wizeline" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {/* Navigation links */}
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/clients" className="a-navbar">
                  <FaIcons.FaUserTie className="mb-1" />
                  &nbsp;&nbsp;Clients
                </Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/projects" className="a-navbar">
                  <FaIcons.FaClipboardList className="mb-1" />
                  &nbsp;&nbsp;Projects
                </Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/teams" className="a-navbar">
                  <FaIcons.FaUsers className="mb-1" />
                  &nbsp;&nbsp;Teams
                </Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/employees" className="a-navbar">
                  <FaIcons.FaUserCog className="mb-1" />
                  &nbsp;&nbsp;Employees
                </Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/department" className="a-navbar">
                  <FaIcons.FaBriefcase className="mb-1" />
                  &nbsp;&nbsp;Department
                </Link>
              </Nav.Link>
            </Nav>
            {/* Dropdown component */}
            <NavDropdown
              title={
                <Fragment>
                  <FaIcons.FaUser className="mb-1"/>
                  &nbsp;&nbsp;My Account
                </Fragment>
              }
              id="basic-nav-dropdown"
              className="a-navbar"
            >
              <NavDropdown.Item href="/profile" className="a-navbar">
                <FaIcons.FaUser className="mb-1"/>
                &nbsp;&nbsp;Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/settings" className="a-navbar">
                <FaIcons.FaCog className="mb-1"/>
                &nbsp;&nbsp;Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="/roadmap" className="a-navbar">
                <FaIcons.FaSitemap className="mb-1" />
                &nbsp;&nbsp;Roadmap
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href=""
                className="a-logout"
                onClick={handleLogout}
              >
                <FaIcons.FaDoorOpen className="mb-1"/>
                &nbsp;&nbsp;
                <a href="/api/auth/logout">LogOut</a>
              </NavDropdown.Item>
              <Modal
                show={
                  showModal && document.querySelector(".a-logout:focus")
                    ? true
                    : false
                }
                backdrop="static"
              >
                <Modal.Header>
                  <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Are you sure you want to logout?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCancelLogout}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleConfirmLogout}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Content */}
      <div className="container pt-4 pb-2">
        <h1 className="mb-3">{props.titulo}</h1>
        <p>{props.descripcion}</p>
      </div>
    </>
  );
};

export default Menu;
