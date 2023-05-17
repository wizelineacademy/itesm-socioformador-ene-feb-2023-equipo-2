// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState, useEffect, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";

import { projectContext, projectListContext } from '@/context/projectsContext';


interface projectListInterface {
  value: string;
  label: string;
  orderstatus: string;
  orderstartdate: string; 
  orderenddate: string; 
  clientname: string; 
  teamname: string;
}

const ProjectTable = () => {
  const projectsContext = useContext(projectContext);
  const projectsListContext = useContext(projectListContext);


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

  const columns: TableColumn<projectListInterface>[] = [
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaRegDotCircle
            className={`status-icon-size ${
              row.orderstatus === "Approved" ? "state-active" : row.orderstatus === "Pending" ? "state-pending" : "state-inactive"
            }`}
          />
        </Fragment>
      ),
      width: "50px",
    },
    {
      name: "Project",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      name: "Client",
      selector: (row) => row.clientname,
    },
    {
      name: "Team",
      selector: (row) => row.teamname,
    },
    {
      name: "Start Date",
      selector: (row) => row.orderstartdate,
    },
    {
      name: "End Date",
      selector: (row) => row.orderenddate,
      //selector: row => row.endDate.getDate() + '/' + row.endDate.getMonth() + '/' + row.endDate.getFullYear(),
    },
    {
      cell: (row) => (
        <Fragment>
          <Link href="/project-overview">
            <FaIcons.FaInfoCircle style={{ color: "black", fontSize: "18px", cursor: "pointer" }}/>
          </Link>
          {/*<FaIcons.FaInfoCircle
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleSeeProjects()}
      />*/}
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

  let projects = projectsListContext?.selectedProject;

  const data = projects?.map((project) => {
    return {
      value: project.value,
      label: project.label,
      orderstatus: project.orderstatus,
      orderstartdate: project.orderstartdate,
      orderenddate: project.orderenddate,
      clientname: project.clientname,
      teamname: project.teamname,
    }
  })

  let selectedProjectID = projectsContext?.currentProject;
  let filteredProjectData = selectedProjectID ? data?.filter(project => project.value === selectedProjectID) : data;

  return (
    <>
      <div className="container my-4">
        <DataTable
          columns={columns}
          data={filteredProjectData}
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
