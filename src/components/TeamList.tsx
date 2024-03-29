import React, { Fragment, useContext, useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn, ExpanderComponentProps } from "react-data-table-component";

import { teamContext, teamListContext } from "@/context/teamContext";

import { useUser } from '@auth0/nextjs-auth0/client';
import { getAuth0Id } from "@/utils/getAuth0Id";


type teamTableInterface = {
  value: string;
  label: string;
  isactive: string;
}

type teamSelectionInterface = {
  value: string;
  label: string;
  employeeid: string;
  employeename: string;
  location: string;
  isactivemember: string;
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
  const teamsContext = useContext(teamContext);
  const teamsListContext = useContext(teamListContext);
  const [collapse, setCollapse] = useState(false);
  const [name, setName] = useState("");
  const [changeTeamId, setChangeTeamId] = useState("");

  const [employeesList, setEmployeesList] = useState<teamSelectionInterface[] | null>(null);
  const [employeesChangeList, setEmployeesChangeList] = useState<employeeSelectionInterface[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const [userInfo, setUserInfo] = useState<any>()
  const { user, error: errorAuth0, isLoading } = useUser();

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let id: number = getAuth0Id(user?.sub)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id
      }),
    };

    fetch(link + "/getUserInfoFromDB", requestOptions)
      .then((response) => response.json())
      .then((data) => setUserInfo(data))
      .catch((error) => console.error("Error al guardar ruta de aprendizaje"));
  }, [isLoading])

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
    window.location.reload();
  };

  const handleChangeTeamStatus = (status : boolean, teamId : string | null) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  id: teamId,
                              //teamMembers: selectedEmployees,
                              newStatus: status }),
    };

    fetch(link + "/changeTeamStatus", requestOptions)
      .then((response) => response.json())
      .then((editedMovie) => {
        window.location.reload();
      })
      .catch(error => console.log("Error ", error));
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

  const columns: TableColumn<teamTableInterface>[] = React.useMemo(
    () => [
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaRegDotCircle
            data-testid={'team-list-status-' + String(row.value) + '-' + String(row.isactive)}
            className={`status-icon-size ${String(row.isactive) === 'true' ? "state-active" : "state-inactive" }`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={String(row.isactive) === 'true' ? 'Team is active' : 'Team is not active' }
          />
        </Fragment>
      ),
      width: "50px",
      omit: userInfo?.idposition === 1 ? false : true,
    },
    {
      name: "Team Name",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaPencilAlt
            data-testid={'edit-team-information-' + String(row.value)}
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => {collapse && changeTeamId === row.value ? setCollapse(!collapse) : 
                              collapse && changeTeamId !== row.value ? setCollapse(collapse) : 
                              setCollapse(!collapse); 
                            setChangeTeamId(row.value); 
                            setName(row.label);} }
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit team information"
          />
        </Fragment>
      ),
      width: "50px",
      omit: userInfo?.idposition === 1 ? false : true,
    },
    {
      cell: (row) => (
        <Fragment>
          {row.isactive ? 
          <FaIcons.FaTrash
            data-testid={'erase-full-team-' + String(row.value)}
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleChangeTeamStatus(false, row.value)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Remove from team"
          />
          :
          <FaIcons.FaArrowUp
            data-testid={'reactivate-full-team-' + String(row.value)}
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleChangeTeamStatus(true, row.value) }
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Re-add to team"
          />
          }
        </Fragment>
      ),
      width: "50px",
      omit: userInfo?.idposition === 1 ? false : true,
    },
    // @ts-ignore
  ], [userInfo],
  );

  //let clients = clientsListContext?.selectedClient;
  const data = teamsListContext?.selectedTeam?.map((team) => {
    return {
      value: team.value,
      label: team.label,
      isactive: team.isactive,
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
                id="newTeamName"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required />
              <div className="col-md">
                <label className="form-label">Members</label>
                {employeesChangeList ? (
                  <Select
                  id="new-members-select"
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
              <button id="update-button" className="btn btn-primary w-100 mt-2" onClick={handleChangeTeam}>
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
