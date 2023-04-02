import React from 'react';
import Image from 'next/image';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logoBtn from 'src/images/logoSearch.jpg';
import styles from 'src/components/Menu.module.css';

interface MenuProps {
  titulo: string;
  descripcion: string;
}

const Menu = (props: MenuProps) => {
  return (
    <>
      {/* Navbar component */}
      <Navbar className="shadow-lg">
        <Container>
          <Navbar.Brand>
            {/* Image component */}
            <Image src={logoBtn} height={40}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {/* Navigation links */}
              <Nav.Link className="container text-dark" style={{ fontSize:'17px',fontWeight: 'semi-bold' }}>Ordenes</Nav.Link>
              <Nav.Link className="container text-dark" style={{ fontSize:'17px',fontWeight: 'semi-bold'}}>Colaboradores</Nav.Link>
            </Nav>
            {/* Button component */}
            <Button variant="container btn text-dark mr-5"className={styles['btn-custom']}>Mi cuenta</Button>
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
