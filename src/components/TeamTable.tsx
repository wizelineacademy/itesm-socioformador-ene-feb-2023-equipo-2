import React, { Fragment, useContext, useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";

import { teamContext, teamListContext } from "@/context/teamContext";
import { employeeContext, employeeListContext } from "@/context/employeeContext";


type teamSelectionInterface = {
  value: string;
  label: string;
  employeeid: string;
  employeename: string;
  location: string;
  isactivemember: string;
  idposition: string;
}

// @ts-ignore
const TeamTable = ({ teamChange }) => {
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

  const handleChangeTeamMembersStatus = (status : boolean | null, teamId : string | null, memberId : string | null) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  memberId: memberId,
                              teamId: teamId,
                              newStatus: status }),
    };

    fetch(link + "/changeTeamMembersStatus", requestOptions)
      .then((response) => response.json())
      .then((editedMovie) => {})
      .catch(error => console.log("Error ", error));
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

  const columns: TableColumn<teamSelectionInterface>[] =  React.useMemo(
    () => [
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaRegDotCircle
            className={`status-icon-size ${String(row.isactivemember) === 'true' ? "state-active" : "state-inactive" }`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={String(row.isactivemember) === 'true' ? 'Team is active' : 'Team is not active' }
          />
        </Fragment>
      ),
      width: "50px",
    },
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
      width: "150px",
    },
    {
      cell: (row) => (
        <Fragment>
          {row.isactivemember ? 
          <FaIcons.FaTrash
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleChangeTeamMembersStatus(false, row.value, row.employeeid)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Remove from team"
          />
          :
          <FaIcons.FaArrowUp
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleChangeTeamMembersStatus(true, row.value, row.employeeid) }
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Re-add to team"
          />
          }
        </Fragment>
      ),
      width: "50px",
    },
  ], [teamChange]);

  //let clients = clientsListContext?.selectedClient;
  const data = employeesList?.map((team) => {
    return {
      value: team.value,
      label: team.label,
      employeeid: team.employeeid,
      employeename: team.employeename,
      location: team.location,
      isactivemember: team.isactivemember,
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
          title='Members'
          // @ts-ignore
          columns={columns}
          // @ts-ignore
          data={filteredTeamData}
          customStyles={customStyles}
          highlightOnHover
          //pointerOnHover
          pagination
          defaultSortFieldId={2}
        />
      </div>
    </>
  );
};

export default TeamTable;
