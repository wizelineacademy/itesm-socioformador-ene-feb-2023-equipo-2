// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";

const ProjectTable = () => {
  const handleSeeProjects = () => {
    alert("se va a redireccionar al perfil del usuario");
  };

  const handleEraseFromSystem = () => {
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
    isActive: 0 | 1 | 2;
    projectName: string;
    clientName: string;
    clientCompany: string;
    teamName: string;
    startDate: string;
    endDate: string;
  }

  const columns: TableColumn<DataRow>[] = [
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaRegDotCircle
            className={`status-icon-size ${
              row.isActive === 2 ? "state-active" : row.isActive === 1 ? "state-pending" : "state-inactive"
            }`}
          />
        </Fragment>
      ),
      width: "50px",
    },
    {
      name: "Project",
      selector: (row) => row.projectName,
      sortable: true,
    },
    {
      name: "Client",
      selector: (row) => row.clientName,
    },
    {
      name: "Team",
      selector: (row) => row.teamName,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      //selector: row => row.endDate.getDate() + '/' + row.endDate.getMonth() + '/' + row.endDate.getFullYear(),
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaInfoCircle
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleSeeProjects()}
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
            onClick={() => handleEraseFromSystem()}
          />
        </Fragment>
      ),
      width: "50px",
    },
  ];

  const data = [
    {
      isActive: 2,
      projectName: "project name",
      clientName: "client name",
      teamName: "team 1",
      startDate: "2019-01-16",
      endDate: "2019-01-16",
    },
    {
      isActive: 1,
      projectName: "project name",
      clientName: "client name",
      teamName: "team 1",
      startDate: "2019-01-16",
      endDate: "2019-01-16",
    },
    {
      isActive: 0,
      projectName: "project name",
      clientName: "client name",
      teamName: "team 1",
      startDate: "2019-01-16",
      endDate: "2019-01-16",
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

export default ProjectTable;
