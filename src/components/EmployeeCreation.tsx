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
import Select from 'react-select'
import * as FaIcons from "react-icons/fa";

import { useHasMounted } from "@/components/useHasMounted";

const EmployeeCreation = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert("prueba");
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
  };

  const roleOptions = [
    { value: 'monterrey', label: 'Monterrey' },
    { value: 'saltillo', label: 'Saltillo' },
    { value: 'reynosa', label: 'Reynosa' },
    { value: 'victoria', label: 'Ciudad Victoria' },
    { value: 'lapaz', label: 'La Paz' },
    { value: 'guadalajara', label: 'Guadalajara' },
    { value: 'queretaro', label: 'Queretaro' },
  ]

  const departmentOptions = [
    { value: 'monterrey', label: 'Monterrey' },
    { value: 'saltillo', label: 'Saltillo' },
    { value: 'reynosa', label: 'Reynosa' },
    { value: 'victoria', label: 'Ciudad Victoria' },
    { value: 'lapaz', label: 'La Paz' },
    { value: 'guadalajara', label: 'Guadalajara' },
    { value: 'queretaro', label: 'Queretaro' },
  ]

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* componente con los inputs de generar perfil */}
        <div className="container">
          <div className="row">
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
                placeholder="Select..."
                required
              />
            </div>
            <div className="col-md">
              <label htmlFor="role" className="form-label">
                Role:
              </label>
              {/*<input
                className="form-control"
                type="text"
                id="role"
                onChange={(event) => setRole(event.target.value)}
                value={role}
                required
              />*/}
              <Select 
                isClearable
                options={roleOptions} />
            </div>
            <div className="col-md">
              <label htmlFor="department" className="form-label">
                Departament:
              </label>
              {/*<input
                className="form-control"
                type="text"
                id="department"
                onChange={(event) => setDepartment(event.target.value)}
                value={department}
                required
              />*/}
              <Select 
                isClearable
                options={departmentOptions} />
            </div>
            <div className="col-md mt-auto justify-content-end">
              <button
                className="btn btn-primary w-50"
                onClick={handleSubmit} >
                <FaIcons.FaTimes className="mb-1" />
                &nbsp;&nbsp;Cancel
              </button>
              <button
                className="btn btn-primary w-50"
                onClick={handleSubmit} >
                <FaIcons.FaPlus className="mb-1" />
                &nbsp;&nbsp;Add
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default EmployeeCreation;