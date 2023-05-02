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
import Collapse from 'react-bootstrap/Collapse';
import * as FaIcons from "react-icons/fa";
import EmployeeSearch from "@/components/EmployeeSearch";
import EmployeeTable from "@/components/EmployeeTable";
import EmployeeCreation from "@/components/EmployeeCreation";
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";

const employees = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
   

  const [alphabeticallyA2Z, setAlphabeticallyA2Z] = useState(true); // True -> A to Z, False -> Z to A
  const [addEmployee, setAddEmployee] = useState(false); // True -> A to Z, False -> Z to A

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Menu titulo={"Search Associates"} descripcion={" "} />
      <EmployeeSearch />
      <div className="container my-4">
        <div className="row">
          <div className="d-flex flex-row-reverse">
            <button
              className="btn btn-primary w-10" 
              onClick={() => setAddEmployee(!addEmployee)}
              aria-controls="employeeCreation"
              aria-expanded={addEmployee}>
              {addEmployee ? (
                <>
                  <FaIcons.FaTimes className="mb-1" />
                  &nbsp;&nbsp;Close
                </>
              ) : (
                <>
                  <FaIcons.FaUserCog className="mb-1" />
                  &nbsp;&nbsp;Add Employee
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <Collapse in={addEmployee}>
        <div id="employeeCreation">
          <EmployeeCreation />
        </div>
      </Collapse>
      <EmployeeTable pageType={"listForAdmin"} />
    </>
  );
};

export default employees;
