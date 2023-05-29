import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import Image from 'next/image';
import transLogo from 'src/images/transLogo.jpg';
import bg from 'src/images/wbg.webp';

export default function Home() {
  // define state variables for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    };

    fetch('http://localhost:3000/api/login', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    // Login form layout

    <div className="bg-light d-flex justify-content-center align-items-center vh-100 position-relative">
      <div className={`position-absolute w-100 h-100`}>
        <Image
          src={bg}
          alt='Wizeline Background'
          layout="fill"
          objectFit="cover"
          quality={100}
          loading="eager"
          placeholder='blur'
          style={{ filter: 'blur(10px)' }}
        />
      </div>
      <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
        <Card style={{ width: '27rem' }}>
          <Card.Body>
            <div className="text-center pt-3 pb-4">
              <Image
                src={transLogo} alt='WizeLine Logo' height={100}
              /></div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </Form.Group>

              <Row className="mt-1 d-flex align-items-center">
                <Col>
                  <a href="#" className="a-login" style={{ fontSize: 'smaller' }}>Forgot your password?</a>
                </Col>
                <Col xs="auto">
                  <Form.Check type="checkbox" style={{ fontSize: 'smaller' }} label="Remind me" className="pt-2" />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Button variant="primary" type="submit" className="btn-primary w-100">
                    <BsIcons.BsFillKeyFill className="mb-1" />
                    &nbsp;&nbsp;Login
                  </Button>

                  <a href="/api/auth/login">Login</a>
                  <a href="/api/auth/logout">Logout</a>

                </Col>
              </Row>

            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
