// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";

interface DataRow {
  id: number;
  isActive: 0 | 1 | 2;
  projectName: string;
  clientName: string;
  clientCompany: string;
  teamName: string;
  startDate: string;
  endDate: string;
  name: string;
}

interface projectListInterface {
  id: number;
  ordername: string;
  orderstatus: string;
  orderstartdate: string; 
  orderenddate: string; 
  clientname: string; 
  teamname: string;
}

const ProjectTable = () => {
  const handleSeeProjects = () => {
    alert("se va a redireccionar al perfil del usuario");
  };

  const handleEraseFromSystem = () => {
    alert("se va a eliminar el usuario de la lista de la orden");
  };

  const [projectList, setProjectList] = useState<projectListInterface[]>([]);

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(link + '/getProjectList')
      .then(res => res.json())
      .then(data => {
        setProjectList(data.orders)
      })
      .catch(error => console.log("Error ", error))
  }, [])

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
      selector: (row) => row.ordername,
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

  const data = [
    {
      "id": 1,
      "isActive": 2,
      "projectName": "project namesss",
      "clientName": "client name",
      "teamName": "team 1",
      "startDate": "2019-01-16",
      "endDate": "2019-01-16",
    },
    /*{
      id: 2,
      isActive: 1,
      projectName: "project name",
      clientName: "client name",
      teamName: "team 1",
      startDate: "2019-01-16",
      endDate: "2019-01-16",
    },
    {
      id: 3,
      isActive: 0,
      projectName: "project name",
      clientName: "client name",
      teamName: "team 1",
      startDate: "2019-01-16",
      endDate: "2019-01-16",
    },*/
  ];

  return (
    <>
      <div className="container my-4">
        <DataTable
          columns={columns}
          data={projectList}
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
