import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";
import Collapse from "react-bootstrap/Collapse";
import { clientContext, clientListContext } from "@/context/clientContext";
import ClientCreation from "@/components/ClientCreation";

interface ClientSelectionInterface {
  value: string;
  label: string;
  email: string;
  phone: string;
  erased: boolean;
}

const ClientSearch = () => {
  const clientsContext = useContext(clientContext);
  const clientsListContext = useContext(clientListContext);

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  // Hooks
  const [name, setName] = useState("");
  const [clientList, setClientList] = useState<ClientSelectionInterface[] | null>(null);
  const [addEmployee, setAddEmployee] = useState(false);
  const [error, setError] = useState("");

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${link}/get-clients?id=${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.client) {
          setClientList(data.client);
          clientsListContext?.setSelectedClientList(data.client);
        } else if (data.message) {
          setError(data.message);
        }
      })
      .catch((error) => setError("An error occurred.")); // Update the error state if the API call fails
  }, []);

  const handleChangeSelect = (e: ClientSelectionInterface | null) => {
    if (e === null) {
      setName("");
    } else {
      setName(e.value);
      clientsContext?.setCurrentClient(e.value);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <label className="form-label">Name:</label>

            {clientList ? (
              <Select
                // @ts-ignore
                onChange={handleChangeSelect}
                value={clientList.find((obj) => obj.value === name) || ""}
                options={clientList}
                isClearable
                id="client-search-select"
              />
            ) : (
              <div>Loading...</div>
            )}

            {error && <div>{error}</div>} {/* Display the error message if present */}
          </div>
          <div className="col-md-2">
            <label className="form-label">&nbsp;</label>
            <button
              className="btn btn-primary w-100"
              data-test="add-client-button"
              onClick={() => setAddEmployee(!addEmployee)}
              aria-controls="employeeCreation"
              aria-expanded={addEmployee}
            >
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
          <Collapse in={addEmployee}>
            <div id="employeeCreation" className="my-3">
              <ClientCreation />
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default ClientSearch;