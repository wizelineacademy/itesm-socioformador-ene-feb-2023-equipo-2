// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";

const ClientCard = () => {
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

  interface DataRow {
    isActive: 0 | 1;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
  }

  const columns: TableColumn<DataRow>[] = [
    {
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
    },
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
      selector: (row) => row.clientName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.clientEmail,
    },
    {
      name: "Phone Number",
      selector: (row) => row.clientPhone,
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

  const data = [
    {
      isActive: 1,
      clientName: "Mario Isaí Robles Lozano",
      clientEmail: "Monterrey",
      clientPhone: "Microsoft",
    },
    {
      isActive: 1,
      clientName: "Jorge Eduardo De Leon Reyna",
      clientEmail: "Reynosa",
      clientPhone: "Macrohard",
    },
    {
      isActive: 0,
      clientName: "Andrea Catalina Fernandez Mena",
      clientEmail: "La Paz",
      clientPhone: "Meta",
    },
    {
      isActive: 1,
      clientName: "Andres Fuentes Alanis",
      clientEmail: "Guadalajara",
      clientPhone: "Google",
    },
    {
      isActive: 0,
      clientName: "Gerardo Mora Beltrán",
      clientEmail: "Queretaro",
      clientPhone: "Softek",
    },
    {
      isActive: 0,
      clientName: "Oscar Alejandro Reyna Mont.",
      clientEmail: "Guadalajara",
      clientPhone: "Youtube",
    },
  ];

  return (
    <>
      <div className="container my-4">
        <DataTable
          columns={columns}
          data={data}
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
