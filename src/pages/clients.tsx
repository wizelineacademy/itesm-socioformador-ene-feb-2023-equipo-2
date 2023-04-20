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
  const [addEmployee, setAddEmployee] = useState(false); 

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <Menu
        titulo="Clients"
        descripcion="Proper project management requires effective client administration. You can administer your existing clients and create new ones to ensure the success of your projects."
      />
      <ClientSearch />
      <div className="container mt-4">
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
        <div id="employeeCreation" className="my-3">
          <ClientCreation />
        </div>
      </Collapse>
      <ClientCard />
    </>
  );
};

export default clients