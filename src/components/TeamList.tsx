import React, { Fragment, useContext, useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn, ExpanderComponentProps } from "react-data-table-component";

import { teamContext, teamListContext } from "@/context/teamContext";
import { employeeContext, employeeListContext } from "@/context/employeeContext";


interface teamSelectionInterface2 {
  value: string,
  label: string,
}

type teamSelectionInterface = {
  value: string;
  label: string;
  employeeid: string;
  employeename: string;
  location: string;
  idposition: string;
}

const TeamList = () => {

  var isAdmin:Boolean = true;

  const teamsContext = useContext(teamContext);
  const teamsListContext = useContext(teamListContext);
  const employeesContext = useContext(employeeContext);
  const employeesListContext = useContext(employeeListContext);
  const [collapse, setCollapse] = useState(false);
  const [name, setName] = useState("");
  const [changeTeamId, setChangeTeamId] = useState("");

  const [employeesList, setEmployeesList] = useState<teamSelectionInterface[] | null>(null);

  const handleChangeTeamName = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  id: changeTeamId, 
                              name: name }),
    };

    fetch(link + "/updateTeamName", requestOptions)
      .then((response) => response.json())
      .then((editedMovie) => {})
      .catch(error => console.log("Error ", error));

    setCollapse(!collapse);
    setChangeTeamId('');
    setName('');
  };

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
      name: "Team Name",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaPencilAlt
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => {collapse && changeTeamId === row.value ? setCollapse(!collapse) : 
                              collapse && changeTeamId !== row.value ? setCollapse(collapse) : 
                              setCollapse(!collapse); 
                            setChangeTeamId(row.value); 
                            setName(row.label);} }
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

  //let clients = clientsListContext?.selectedClient;
  const data = teamsListContext?.selectedTeam?.map((team) => {
    return {
      value: team.value,
      label: team.label,
    }
  })

  let selectedTeamID = teamsContext?.currentTeam;
  
  // @ts-ignore
  let filteredTeamData = selectedTeamID != "" && selectedTeamID != "undefined" && selectedTeamID != "0" ? data?.filter(team => team.value === selectedTeamID) : data;
                        
  return (
    <>
      <div className="container my-4">
          <Collapse in={collapse}>
            <div id="collapseProjectCreation" className="my-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                className="form-control"
                type="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required />
              <button className="btn btn-primary w-100 mt-2" onClick={handleChangeTeamName}>
                <FaIcons.FaPlus className="mb-1" />
                &nbsp;&nbsp;Update
              </button>
            </div>
          </Collapse>
        <DataTable
          title='Teams'
          // @ts-ignore
          columns={columns}
          // @ts-ignore
          data={filteredTeamData}
          customStyles={customStyles}
          highlightOnHover
        />
      </div>
    </>
  );
};

export default TeamList;
