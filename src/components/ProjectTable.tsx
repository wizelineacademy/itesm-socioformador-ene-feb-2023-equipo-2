// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState, useEffect, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";

import { projectContext, projectListContext } from '@/context/projectsContext';
import { clientContext, ClientListContext, clientListContext } from "@/context/clientContext";
import { useRouter } from 'next/router';

interface projectListInterface {
  value: string;
  label: string;
  orderstatus: string;
  orderstartdate: string; 
  orderenddate: string; 
  idclient: string;
  clientname: string; 
  idteam: string;
  teamname: string;
}

interface CardProps {
  clientID: string;
}

const ProjectTable = (props: CardProps) => {
  const projectsContext = useContext(projectContext);
  const projectsListContext = useContext(projectListContext);
  const clientsContext = useContext(clientContext);
  const clientsListContext = useContext(clientListContext);

  const projectTableRouter = useRouter();

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
          <div onClick={() => {projectTableRouter.push({pathname: '/project-modification',query: { slug: row.value },});}}>
            <FaIcons.FaPencilAlt style={{ color: "black", fontSize: "18px", cursor: "pointer" }}/>
          </div>
          {/*
          href="/project-overview"
          <FaIcons.FaInfoCircle
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
          <div onClick={() => {projectTableRouter.push({pathname: '/project-overview',query: { slug: row.value },});}}>
            <FaIcons.FaInfoCircle style={{ color: "black", fontSize: "18px", cursor: "pointer" }}/>
          </div>
          {/*
          href="/project-overview"
          <FaIcons.FaInfoCircle
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
  //let clients = clientsListContext?.selectedClient;

  const data = projects?.map((project) => {
    return {
      value: project.value,
      label: project.label,
      orderstatus: project.orderstatus,
      orderstartdate: project.orderstartdate,
      orderenddate: project.orderenddate,
      idclient: project.idclient,
      clientname: project.clientname,
      idteam: project.idteam,
      teamname: project.teamname,
    }
  })

  // let filteredProjectData;
  
  // if (props.clientID) {
  //   filteredProjectData = data?.filter(project => project.idclient === props.clientID);
  // }

  let selectedProjectID = projectsContext?.currentProject;
  let selectedClientID = clientsContext?.currentClient;
  let selectedProjectIDInt = parseInt(projectsContext?.currentProject);
  let selectedClientIDInt = parseInt(clientsContext?.currentClient);
  console.log(selectedClientID)
  console.log(selectedProjectID)
  
  console.log(selectedProjectID != "" && selectedClientID != "" && selectedProjectID != undefined && selectedClientID != undefined)
  console.log(selectedProjectID != "" && selectedProjectID != undefined)
  console.log(selectedClientID != "" && selectedClientID != undefined && selectedProjectID != "0")
  console.log(selectedClientID === "undefined")

  /*console.log(selectedClientID);
  console.log(data[6].idclient);
  console.log(selectedClientID === data[6].idclient);*/
  
  let filteredProjectData = (selectedProjectID != "" && selectedClientID != "" && selectedProjectID != "undefined" && selectedClientID != "undefined" && selectedProjectID != "0" && selectedClientID != "0") ? data?.filter(project => project.value === selectedProjectIDInt && project.idclient === selectedClientIDInt) :
                        selectedProjectID != "" && selectedProjectID != "undefined" && selectedProjectID != "0" ? data?.filter(project => project.value === selectedProjectIDInt) :
                        selectedClientID != "" && selectedClientID != "undefined" && selectedClientID != "0" ? data?.filter(project => project.idclient === selectedClientIDInt) : data;

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
