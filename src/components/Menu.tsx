import React from "react";
import Image from "next/image";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Link from 'next/link';
import logoBtn from "src/images/logoSearch.jpg";
import styles from "src/components/Menu.module.css";

interface MenuProps {
  titulo: string;
  descripcion: string;
}

const Menu = (props: MenuProps) => {
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
                <Link href="/admin/clients">Clients</Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/admin/orders">Orders</Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/admin/teams">Teams</Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/admin/users">Users</Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
                <Link href="/admin/skills">Skills</Link>
              </Nav.Link>
            </Nav>
            {/* Button component */}
            <Button
              variant="container btn text-dark mr-5"
              className={styles["btn-custom"]}
            >
              Mi cuenta
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Content */}
      <div className="container pt-4">
        <h1>{props.titulo}</h1>
        <p>{props.descripcion}</p>
      </div>
    </>
  );
};

export default Menu;
