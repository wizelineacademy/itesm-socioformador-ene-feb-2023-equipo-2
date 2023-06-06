import React, { Fragment, useContext, useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn, ExpanderComponentProps } from "react-data-table-component";

import { teamContext, teamListContext } from "@/context/teamContext";


type teamSelectionInterface = {
  value: string;
  label: string;
  employeeid: string;
  employeename: string;
  location: string;
  idposition: string;
}

//Interface for employee
type employeeSelectionInterface = {
  value: string,
  label: string,
  linkedinlink: string,
  cvfile: string,
  profileimg: string,
  inforoadmap: string,
  idposition: number,
  email: string,
  password: string,
  location: string,
  infoabout: string,
  status: boolean
}

// @ts-ignore
const TeamList = ({ setTeamChange, teamChange }) => {

  var isAdmin:Boolean = true;

  const teamsContext = useContext(teamContext);
  const teamsListContext = useContext(teamListContext);
  const [collapse, setCollapse] = useState(false);
  const [name, setName] = useState("");
  const [changeTeamId, setChangeTeamId] = useState("");

  const [employeesList, setEmployeesList] = useState<teamSelectionInterface[] | null>(null);
  const [employeesChangeList, setEmployeesChangeList] = useState<employeeSelectionInterface[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  let link = process.env.NEXT_PUBLIC_API_URL;

  const handleChangeTeam = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  id: changeTeamId, 
                              name: name,
                              teamMembers: selectedEmployees }),
    };

    fetch(link + "/updateTeam", requestOptions)
      .then((response) => response.json())
      .then((editedMovie) => {})
      .catch(error => console.log("Error ", error));

    setCollapse(!collapse);
    setChangeTeamId('');
    setName('');
    // @ts-ignore
    setTeamChange(prevTeamChange => !prevTeamChange);
  };

  const handleChangeSelectEmployeeName = (e : any[] | null) => {
    if (e === null) {
      setSelectedEmployees([]);
    } else {
      const selectedValues = e.map((option) => option.value);
      setSelectedEmployees(selectedValues);
    }
  };

  /* funcion para sacar solo los que ya estan, para filtrar la lista completa, no funcionó, si no se agrega esto, borrar la api
  const handleGetMembersInTeam = (teamId : any | null) => {
    const requestOptionsList = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedTeamID: teamId }),
    };

    fetch(link + "/getMembersInTeam", requestOptionsList)
      .then(res => res.json())
      .then(data => {
        setEmployeesList(data.teamMembers);
      })
      .catch(error => console.log("Error ", error))
  };*/

  useEffect(() => {
    fetch(link + '/get-employees')
      .then(res => res.json())
      .then(data => {
        setEmployeesChangeList(data.employees)
      })
      .catch(error => console.log("Error", error))
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
            //onClick={() => handleEraseFromSystem()}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Hooray!"
          />
        </Fragment>
      ),
      width: "50px",
    },
    // @ts-ignore
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
                Change name:
              </label>
              <input
                className="form-control"
                type="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required />
              <div className="col-md">
                <label className="form-label">Members</label>
                {employeesChangeList ? (
                  <Select
                  // @ts-ignore
                  onChange={handleChangeSelectEmployeeName}
                  value={employeesChangeList.filter((obj) =>
                    selectedEmployees.includes(obj.value)
                  )}
                  options={employeesChangeList}
                  isClearable
                  isMulti
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <button className="btn btn-primary w-100 mt-2" onClick={handleChangeTeam}>
                <FaIcons.FaPlus className="mb-1" />
                &nbsp;&nbsp;Change
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
          defaultSortFieldId={1}
        />
      </div>
    </>
  );
};

export default TeamList;
