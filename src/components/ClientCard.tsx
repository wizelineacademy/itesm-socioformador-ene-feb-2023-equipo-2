// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";

import { useContext } from 'react'
import { clientContext, ClientListContext, clientListContext } from "@/context/clientContext";


const ClientCard = () => {
  const clientsContext = useContext(clientContext);
  const clientsListContext = useContext(clientListContext);

  const handleClientSeeProjects = () => {
    alert("se va a redireccionar al perfil del usuario");
  };

  const handleClientEdit = () => {
    alert("editar")
  }

  const handleClientEraseFromSystem = () => {
    alert("se va a eliminar el usuario de la lista de la orden");
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#EDEDED",
        borderBottomColor: "#FFFFFF",
        borderRadius: "10px",
        outline: "1px solid #FFFFFF",
      },
    },
  };

  interface clientSelectionInterface {
    value: string;
    label: string;
    email: string;
    phone: string;
    erased: boolean;
  }

  let clients = clientsListContext?.selectedClient;

  /*[
    // An array of projects of type projectsInterface
    // Replace with your actual project data
  ];*/

  let columns: TableColumn<clientSelectionInterface>[] = [
    /*{
      cell: (row) => (
        <Fragment>
          <FaIcons.FaRegDotCircle
            className={`status-icon-size ${
              row.isActive === 1
                ? "state-active"
                : "state-inactive"
            }`}
          />
        </Fragment>
      ),
      width: "50px",
    },*/
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaCircle style={{ color: "black", fontSize: "50px" }} />
        </Fragment>
      ),
      width: "50px",
    },
    {
      name: "Name",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
    },
    {
      name: "Erased?",
      selector: (row) => row.erased,
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaClipboardList
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleClientSeeProjects()}
          />
        </Fragment>
      ),
      width: "50px",
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaPencilAlt
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleClientEdit()}
          />
        </Fragment>
      ),
      width: "50px",
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaTrash
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleClientEraseFromSystem()}
          />
        </Fragment>
      ),
      width: "50px",
    },
  ];

  const data = clients?.map((client) => {
    return {
      value: client.value,
      label: client.label,
      email: client.email,
      phone: client.phone,
      erased: client.erased,
    }
  })

  let selectedClientID = clientsContext?.currentClient;
  let filteredData = selectedClientID ? data?.filter(client => client.value === selectedClientID) : data;

  return (
    <>
      <div className="container my-4">
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          highlightOnHover
          //pointerOnHover
          pagination
        />
      </div>
    </>
  );
};

export default ClientCard;
