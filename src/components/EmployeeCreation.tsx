// TODO:

// The presentation of the user management features has not been decided yet.
// It could be implemented as a pop-up, another page, or as part of the same page.
// Some of the features that we want to include are:
//   - Add button: This button will allow the user to add new accounts to the system.
//   - Edit button: This button will allow the user to edit existing accounts.
//   - Delete button: This button will allow the user to delete accounts from the system.
// For now, add form to add / edit / erase at the boton of page

// To make it easier for users to find specific employees, we will also include the EmployeeSearch.tsx component.
// This component will allow users to search for employees by name, department, or other criteria.

// We will display a table showing all the users in the system.
// This table will include basic information about each user, such as their name, email, and role.

import React, { useState } from "react";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import {
  Navbar,
  Nav,
  Button,
  Modal,
  Container,
  NavDropdown,
} from "react-bootstrap";

import { useHasMounted } from "@/components/useHasMounted";
var AuthenticationClient = require('auth0').AuthenticationClient;

const EmployeeCreation = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [token, setToken] = useState("")
  const [userRegistrationErrorModal, setUserRegistrationErrorModal] = useState(false)

  function generateRandomPassword(): string {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }

  function generateRandomUserId(): number {
    const characters = "0123456789";
    let userId = "";
    for (let i = 0; i < 5; i++) {
      userId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    let userIdInt = +userId
    return userIdInt;
  }

  const password = generateRandomPassword()
  const userId = generateRandomUserId()

  const handleSubmit = async (event: any) => {

    // credentials to generate the auth0 token necessary to create new users
    var auth0 = new AuthenticationClient({
      domain: 'dev-xo3qm08sbje0ntri.us.auth0.com',
      clientId: 'R5DfLlk2CIEX69qaGi0Zf2DgMvQB3oeE',
      clientSecret: 'LaXptxqYUYJhmzssip6CLz4L1oA5c21iLBM5gRA5uexQBV84R8AOxWkX2obX4Pdp'
    });

    // method to geerate the auth0 token necessary to create new users
    auth0.clientCredentialsGrant(
      {
        audience: 'https://dev-xo3qm08sbje0ntri.us.auth0.com/api/v2/',
        scope: 'create:users read:users update:users read:roles',
      },
      function (err: any, response: any) {
        if (err) {
          console.error(err)
          console.error(response)
        } else {
          console.log(response?.access_token);
          setToken(response?.access_token)
        }

      }
    );

    //method to create new users in the auth0 app
    const requestOptionsAuth0NewUser = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(
        {
          email: email,
          user_id: userId.toString(),
          connection: "Username-Password-Authentication",
          password: generateRandomPassword(),
          email_verified: true,
          name: name
        }
      )
    };

    fetch('https://dev-xo3qm08sbje0ntri.us.auth0.com/api/v2/users', requestOptionsAuth0NewUser)
      .then(response => response.json())
      .then(data => {
        console.log("Usuario guardado correctamente en Auth0")

        //method to create users in db (only executed if auth0 registration is correct)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              email: email,
              userId: userId,
              position: role,
              name: name
            }
          )
        };

        fetch('http://localhost:3000/api/createUsers', requestOptions)
          .then(response => response.json())
          .then(data => console.log("Usuario guardado correctamente"))
          .catch(error => console.error("Error al guardar usuario"));

        setUserRegistrationErrorModal(true)


        event.preventDefault();
      })
      .catch(error => {
        console.error("Error al guardar usuario en Auth0")
        setUserRegistrationErrorModal(true)
      });


  };

  const roleOptions = [
    { value: 1, label: "Administrador" },
    { value: 2, label: "Empleado General" },
    { value: 3, label: "Cliente" }
  ];

  const departmentOptions = [
    { value: "monterrey", label: "Monterrey" },
    { value: "saltillo", label: "Saltillo" },
    { value: "reynosa", label: "Reynosa" },
    { value: "victoria", label: "Ciudad Victoria" },
    { value: "lapaz", label: "La Paz" },
    { value: "guadalajara", label: "Guadalajara" },
    { value: "queretaro", label: "Queretaro" },
  ];

  if (!hasMounted) {
    return null;
  }

  const handleRoleSelect = (e: any | null) => {
    if (e === null) {
      setName("");
    } else {
      setRole(e.value);
    }
  };

  console.log("role", role)

  return (
    <>
      {/* componente con los inputs de generar perfil */}
      <div className="container bg-light border p-4">
        <div className="row">
          <div className="col-md">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className="col-md">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>
          <div className="col-md">
            <label htmlFor="role" className="form-label">
              Role:
            </label>
            <Select
              isClearable
              value={role}
              onChange={handleRoleSelect}
              // ts-ignore
              options={roleOptions}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md"></div>
          <div className="col-md"></div>
          <div className="col-md">
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              <FaIcons.FaPlus className="mb-1" />
              &nbsp;&nbsp;Add
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={
          userRegistrationErrorModal ? true : false
        }
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Error al registrar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Favor de volver a intententar el registro</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => setUserRegistrationErrorModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={(e) => setUserRegistrationErrorModal(false)}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeCreation;
