import React, { useState } from "react";
import Collapse from 'react-bootstrap/Collapse';
import * as FaIcons from 'react-icons/fa';
import ClientSearch from "@/components/ClientSearch";
import ClientCard from "@/components/ClientCard";
import ClientCreation from "@/components/ClientCreation";
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";

import { ClientListContext } from "@/context/clientContext";
import { ClientContext } from "@/context/clientContext";

const clients = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
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
      <ClientListContext>
        <ClientContext>
          <ClientSearch />
          {/* <div className="container mt-4">
            <div className="row">
              <div className="d-flex flex-row-reverse">
                <button
                  className="btn btn-primary" 
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
                      <FaIcons.FaUserTie className="mb-1" />
                      &nbsp;&nbsp;Add Clients
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <Collapse in={addEmployee}>
            <div id="employeeCreation" className="my-3">
              <ClientCreation />
            </div>
          </Collapse> */}
          <ClientCard />
        </ClientContext>
      </ClientListContext>
    </>
  );
};

export default clients