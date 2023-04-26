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
import CreatableSelect from "react-select/creatable";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";

const ClientCreation = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let link = process.env.NEXT_PUBLIC_API_URL;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    };
    fetch(link + "/createClient", requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        alert(data);
        console.log(data);
      })
      .catch((error) => console.error("Error", error));
  };

  const companyOptions = [
    { value: "monterrey", label: "Monterrey" },
    { value: "saltillo", label: "Saltillo" },
    { value: "reynosa", label: "Reynosa" },
    { value: "victoria", label: "Ciudad Victoria" },
    { value: "lapaz", label: "La Paz" },
    { value: "guadalajara", label: "Guadalajara" },
    { value: "queretaro", label: "Queretaro" },
  ];

  const locationOptions = [
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

  return (
    <>
      {/* componente con los inputs de generar perfil */}
      <div className="container bg-light border p-4">
        <div className="row">
          <h4 className="mb-3"> Create new client account </h4>
        </div>
        <div className="row">
          <div className="col-md">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              className="form-control"
              type="name"
              id="name"
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
            />
          </div>
          {/* <div className="col-md">
            <label htmlFor="company" className="form-label">
              Company:
            </label>
            <CreatableSelect
              isClearable
              options={companyOptions}
              placeholder="Select or create company..."
            />
          </div>
          <div className="col-md">
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <CreatableSelect
              isClearable
              options={locationOptions}
              placeholder="Select or create location..."
            />
          </div> */}
        </div>

        {/* Segunda línea */}
        <div className="row mt-3">
          <div className="col-md">
            <span>&nbsp;</span>
          </div>
          <div className="col-md">
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              <FaIcons.FaTimes className="mb-1" />
              &nbsp;&nbsp;Cancel
            </button>
          </div>
          <div className="col-md">
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              <FaIcons.FaPlus className="mb-1" />
              &nbsp;&nbsp;Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientCreation;
