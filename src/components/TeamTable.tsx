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

  const columns: TableColumn<teamSelectionInterface>[] = [
    {
      name: "Team Name",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      name: "Member Name",
      selector: (row) => row.employeename,
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
  ];

  let teams = teamsListContext?.selectedTeam;
  //let clients = clientsListContext?.selectedClient;
  const data = teams?.map((team) => {
    return {
      value: team.value,
      label: team.label,
      employeeid: team.employeeid,
      employeename: team.employeename,
      location: team.location,
      idposition: team.idposition,
    }
  })
  console.log('data', data)

  let selectedTeamID = teamsContext?.currentTeam;
  let selectedEmployeeID = employeesContext?.currentEmployee;
  
  // @ts-ignore
  let filteredTeamData = (selectedTeamID != "" && selectedEmployeeID != "" && selectedTeamID != "undefined" && selectedEmployeeID != "undefined" && selectedTeamID != "0" && selectedEmployeeID != "0") ? data?.filter(team => team.value === selectedTeamID && team.employeeid === selectedEmployeeID.toString()) :
                        // @ts-ignore
                        selectedTeamID != "" && selectedTeamID != "undefined" && selectedTeamID != "0" ? data?.filter(team => team.value === selectedTeamID) :
                        // @ts-ignore
                        selectedEmployeeID != "" && selectedEmployeeID != "undefined" && selectedEmployeeID != "0" ? data?.filter(team => team.employeeid === selectedEmployeeID.toString()) :
                        // @ts-ignore                        
                        data;
  console.log('filteredTeamData', filteredTeamData)
  console.log('selectedTeamID', selectedTeamID)
  console.log('selectedEmployeeID', selectedEmployeeID)
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
