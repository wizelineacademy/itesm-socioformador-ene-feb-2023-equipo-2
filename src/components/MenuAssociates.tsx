import React, { useState } from "react";
import Image from "next/image";
import { Navbar, Nav, Button, Modal, Container, NavDropdown } from "react-bootstrap";
import Link from 'next/link';
import logoBtn from "src/images/logoSearch.jpg";
import styles from "src/components/Menu.module.css";

interface MenuProps {
  titulo: string;
  descripcion: string;
}

const MenuAssociates = (props: MenuProps) => {

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleLogout = () => {
    setShowModal(true);
  }

  const handleCancelLogout = () => {
    setShowModal(false);
  }

  const handleConfirmLogout = () => {
    setShowModal(false);
    window.location.href = '/login';
  }

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
                <Link href="/admin/clients" className="a-navbar" >Clients</Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/admin/orders" className="a-navbar" >Orders</Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/admin/teams" className="a-navbar" >Teams</Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/admin/users" className="a-navbar" >Users</Link>
              </Nav.Link>
              
            </Nav>
            {/* Dropdown component */}
            <NavDropdown title="My Account" id="basic-nav-dropdown" className="a-navbar">
              <NavDropdown.Item href="settings" className="a-navbar">Settings</NavDropdown.Item>
              <NavDropdown.Item href="roadmap" className="a-navbar">Roadmap</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" className="a-logout" onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
                <Modal show={showModal && document.querySelector('.a-logout:focus') ? true: false} backdrop="static">
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

export default MenuAssociates;
