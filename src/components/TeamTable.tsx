import React, { Fragment, useContext, useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn, ExpanderComponentProps } from "react-data-table-component";

import { teamContext, teamListContext } from "@/context/teamContext";
import { employeeContext, employeeListContext } from "@/context/employeeContext";
import { useRouter } from 'next/router';

type teamSelectionInterface = {
  value: string;
  label: string;
  employeeid: string;
  employeename: string;
  location: string;
  idposition: string;
}

const TeamTable = () => {
  const teamsContext = useContext(teamContext);
  const teamsListContext = useContext(teamListContext);
  const employeesContext = useContext(employeeContext);
  const employeesListContext = useContext(employeeListContext);

  const [employeesList, setEmployeesList] = useState<teamSelectionInterface[] | null>(null);

  const handleEraseFromSystem = () => {
    alert("se va a eliminar el usuario de la lista de la orden");
  };

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(link + '/getTeamMembers')
      .then(res => res.json())
      .then(data => {
        setEmployeesList(data.teamMembers)
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

  const columns: TableColumn<teamSelectionInterface>[] = [
    {
      name: "Member Name",
      selector: (row) => row.employeename,
      sortable: true,
    },
    {
      name: "Team",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      name: "Member Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      cell: (row) => (
        <Fragment>{row.idposition === '2' ? "admin" : ""}</Fragment>
      ),
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

  //let clients = clientsListContext?.selectedClient;
  const data = employeesList?.map((team) => {
    return {
      value: team.value,
      label: team.label,
      employeeid: team.employeeid,
      employeename: team.employeename,
      location: team.location,
      idposition: team.idposition,
    }
  })

  let selectedTeamID = teamsContext?.currentTeam;
  let selectedEmployeeID = employeesContext?.currentEmployee;
  
  // @ts-ignore
  let filteredTeamData = (selectedTeamID != "" && selectedEmployeeID != "" && selectedTeamID != "undefined" && selectedEmployeeID != "undefined" && selectedTeamID != "0" && selectedEmployeeID != "0") ? data?.filter(team => team.value === selectedTeamID.toString() && team.employeeid === selectedEmployeeID.toString()) :
                        // @ts-ignore
                        selectedTeamID != "" && selectedTeamID != "undefined" && selectedTeamID != "0" ? data?.filter(team => team.value === selectedTeamID.toString()) :
                        // @ts-ignore
                        selectedEmployeeID != "" && selectedEmployeeID != "undefined" && selectedEmployeeID != "0" ? data?.filter(team => team.employeeid === selectedEmployeeID.toString()) :
                        // @ts-ignore                        
                        data;

  return (
    <>
      <div className="container my-4">
        <DataTable
          // @ts-ignore
          columns={columns}
          // @ts-ignore
          data={filteredTeamData}
          customStyles={customStyles}
          highlightOnHover
          //pointerOnHover
          pagination
        />
      </div>
    </>
  );
};

export default TeamTable;
