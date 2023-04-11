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
import * as FaIcons from "react-icons/fa";

import EmployeeSearch from "@/components/EmployeeSearch";
import EmployeeCard from "@/components/EmployeeCard";
import Menu from "@/components/Menu";

const users = () => {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert("prueba");
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
  };

  return (
    <>
      <Menu titulo={"Buscar Colaboradores"} descripcion={" "} />
      <EmployeeSearch />
    {/* componente con los inputs de generar perfil */}
      <div className="bg-light pt-4 pb-4 border-top">
        <div className="container">
          <div className="row">
            <div className="col-md">
              <label htmlFor="id" className="form-label">
                ID:
              </label>
              <input
                className="form-control"
                type="number"
                id="id"
                onChange={(event) => setId(event.target.value)}
                value={id}
                required
              />
            </div>
            <div className="col-md">
              <label htmlFor="first-name" className="form-label">
                Nombre:
              </label>
              <input
                className="form-control"
                type="text"
                id="first-name"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="col-md">
              <label htmlFor="last-name" className="form-label">
                Apellido:
              </label>
              <input
                className="form-control"
                type="text"
                id="last-name"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <label htmlFor="email" className="form-label">
                Correo Electrónico:
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
              />
            </div>
            <div className="col-md">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <label htmlFor="role" className="form-label">
                Rol:
              </label>
              <input
                className="form-control"
                type="text"
                id="role"
                onChange={(event) => setRole(event.target.value)}
                value={role}
                required
              />
            </div>
            <div className="col-md">
              <label htmlFor="department" className="form-label">
                Departamento:
              </label>
              <input
                className="form-control"
                type="text"
                id="department"
                onChange={(event) => setDepartment(event.target.value)}
                value={department}
                required
              />
            </div>
            <div className="col-md">
              <label htmlFor="phone" className="form-label">
                Teléfono:
              </label>
              <input
                className="form-control"
                type="text"
                id="role"
                onChange={(event) => setPhone(event.target.value)}
                value={phone}
                required
              />
            </div>
            <div className="col-md">
              <label htmlFor="address" className="form-label">
                Dirección:
              </label>
              <input
                className="form-control"
                type="text"
                id="department"
                onChange={(event) => setAddress(event.target.value)}
                value={address}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleSubmit}
              >
                <FaIcons.FaUserPlus className="mb-1" />
                &nbsp;&nbsp;Agregar Usuario
              </button>
            </div>
            <div className="col">
              <button className="btn btn-primary w-100 mt-3">
                <FaIcons.FaUserEdit className="mb-1" />
                &nbsp;&nbsp;Editar Usuario
              </button>
            </div>
            <div className="col">
              <button className="btn btn-primary w-100 mt-3">
                <FaIcons.FaArrowLeft className="mb-1" />
                &nbsp;&nbsp;Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
      <EmployeeCard pageType={'showAll'}/>
    </>
  );
};

export default users;
