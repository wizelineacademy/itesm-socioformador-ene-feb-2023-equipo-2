// TODO: 
// 1. get con clientes
// 2. post con busqueda de clientes
import React, { useState , useEffect } from "react";
import Select from "react-select";
import * as FaIcons from 'react-icons/fa';
import { useHasMounted } from "@/components/useHasMounted";

import { useContext } from 'react';
import { clientContext, ClientListContext, clientListContext } from "@/context/clientContext";
import { any } from "cypress/types/bluebird";


interface clientSelectionInterface {
  value: string,
  label: string,
  email: string,
  phone: string,
  erased: boolean
}

const ClientSearch = () => {
  const clientsContext = useContext(clientContext);
  const clientsListContext = useContext(clientListContext);
  
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  //Hooks
  const [name, setName] = useState("");
  const [clientList, setClientList] = useState<clientSelectionInterface[] | null>(null);


  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${link}/get-clients?id=${name}`)
      .then(res => res.json())
      .then(data => {
        setClientList(data.client)
        clientsListContext?.setSelectedClientList(data.client);
      })
      .catch(error => console.log("Error ", error))
  }, [])

  useEffect(() => {
  }, [clientsContext?.setCurrentClient(name)]);

  //  const options = [
  //    { value: "1", label: "one" },
  //    { value: "2", label: "two" },
  //  ];

  const handleChangeSelect = (e : any | null) => {
    if (e === null) {
      setName("");
    } else {
      setName(e.value);
      clientsContext?.setCurrentClient(e.value);
      //console.log(clientsContext?.currentClient)
      //console.log(clientsListContext?.selectedClient)
    }
  };

  const handleSearch = (e : any) => {
    alert("buscando")
  }

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="container">
        {/*for searching employees by their name*/}
        <div className="row">
          <div className="col-md-10">
            <label className="form-label">Name:</label>
        
            {clientList ? (
              <Select
                onChange={handleChangeSelect}
                value={clientList.find((obj) => obj.value === name) || ""}
                options={clientList}
                isClearable
              />
            ) : (
              <div>Loading...</div>
            )}

            
          </div>
          <div className="col-md-2">
            <label className="form-label">&nbsp;</label>
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              <FaIcons.FaSearch className="mb-1" />
              &nbsp;&nbsp;Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientSearch;
