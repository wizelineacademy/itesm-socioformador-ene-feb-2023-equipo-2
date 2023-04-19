import React, { useState } from "react";
import Collapse from 'react-bootstrap/Collapse';
import * as FaIcons from 'react-icons/fa';

import ClientSearch from "@/components/ClientSearch";
import ClientCard from "@/components/ClientCard";
import ClientCreation from "@/components/ClientCreation";
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";

const clients = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
  const [name, setName] = useState("");

  const [alphabeticallyA2Z, setAlphabeticallyA2Z] = useState(true); // True -> A to Z, False -> Z to A
  const [addEmployee, setAddEmployee] = useState(false); // True -> A to Z, False -> Z to A

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <Menu
        titulo="Clients"
        descripcion="To create orders, kindly create a client account first."
      />
      {/*<div className="container">
        <label htmlFor="name" className="form-label">
          Full name:
        </label>
        <input
          className="form-control"
          type={"text"}
          id="name"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
      />*/}
        {/* Submit button */}
       {/*  <button className="btn btn-primary mt-3">
          <FaIcons.FaPlus className="mb-1" />
          &nbsp;&nbsp;Add Skill
        </button>
      </div>*/}
      <ClientSearch />
      <div className="container my-4">
        <div className="row">
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary w-10"
              onClick={() => setAlphabeticallyA2Z(!alphabeticallyA2Z)}>
              {alphabeticallyA2Z ? <FaIcons.FaSortAlphaDown className="mb-1" /> : <FaIcons.FaSortAlphaUpAlt className="mb-1" />}
              &nbsp;&nbsp;Sort
            </button>
            <button
              className="btn btn-primary w-10" 
              onClick={() => setAddEmployee(!addEmployee)}
              aria-controls="employeeCreation"
              aria-expanded={addEmployee}>
              <FaIcons.FaUserPlus className="mb-1" />
              &nbsp;&nbsp;Add User
            </button>
          </div>
        </div>
      </div>
      <Collapse in={addEmployee}>
        <div id="employeeCreation">
          <ClientCreation />
        </div>
      </Collapse>
      <ClientCard />
    </>
  );
};

export default clients