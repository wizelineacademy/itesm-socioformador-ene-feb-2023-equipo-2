import React, {useEffect, useState, useContext } from "react";
import { Container, Collapse } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";
import TeamCreation from "@/components/TeamCreation";

import { teamContext, teamListContext } from "@/context/teamContext";
import { employeeContext, employeeListContext } from "@/context/employeeContext";


//Interface for teams
interface teamSelectionInterface {
  value: string,
  label: string,
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

const TeamSearch = () => {
  const teamsContext = useContext(teamContext);
  const teamsListContext = useContext(teamListContext);
  //Import for calling members 
  const employeesContext = useContext(employeeContext);
  const employeesListContext = useContext(employeeListContext);
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  //Hook for team information

  const [name, setName] = useState("");
  const [teamList, setTeamList] = useState<teamSelectionInterface[] | null>(null);

  //Hook for employee data
  const [employeesList, setEmployeesList] = useState<employeeSelectionInterface[] | null>(null);
  const [employeeName, setEmployeeName] = useState("");

  // React Hooks for managing component state for add new client
  const [collapse, setCollapse] = useState(false);

  var isAdmin:Boolean = true;
  
  
  let link = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    fetch(link + '/get-teams')
      .then(res => res.json())
      .then(data => {
        setTeamList(data.teams)
        teamsListContext?.setSelectedTeamList(data.teams);
      })
      .catch(error => console.log("Error ", error))
  }, [])

  useEffect(() => {
  }, [teamsContext?.setCurrentTeam(name)]);

  //Use effect hooks for employee deploy on team data
  
  // fetch of employees to later place in react-select.
  useEffect(() => {
    fetch(link + '/get-employees')
      .then(res => res.json())
      .then(data => {
        setEmployeesList(data.employees)
        employeesListContext?.setSelectedEmployeeList(data.employees);
      })
      .catch(error => console.log("Error", error))
  }, [])

  useEffect(() => {
  }, [employeesContext?.setCurrentEmployee(employeeName)]);

  //Handle func for table
  const handleChangeSelect = (e : any | null) => {
    if (e === null) {
      setName("");
    } else {
      setName(e.value);
      teamsContext?.setCurrentTeam(e.value);
    }
  };

  //Handle func for employees
  const handleChangeSelectEmployeeName = (e : any | null) => {
    if (e === null) {
      setEmployeeName("");
    } else {
      setEmployeeName(e.value);
      employeesContext?.setCurrentEmployee(e.value);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="container">
        {/*for searching employees by their name*/}
        <div className="row">
          <div className="col-md">
            <label className="form-label">Name:</label>
            {teamList ? (
              <Select
                onChange={handleChangeSelect}
                value={teamList.find((obj) => obj.value === name) || ""}
                options={teamList}
                isClearable
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="col-md">
            <label className="form-label">Members</label>
            {employeesList ? (
              <Select
              onChange={handleChangeSelectEmployeeName}
              value={employeesList.find(
                (obj) => obj.value === employeeName
              )}
              options={employeesList}
              isClearable
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="col-md-2">
            <label className="form-label">&nbsp;</label>
            {isAdmin ? 
              <Container className="mt">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => setCollapse(!collapse)}
                  aria-controls="collapseProjectCreation"
                  aria-expanded={collapse}
                >
                  {collapse ? (
                  <>
                    <FaIcons.FaTimes className="mb-1" />
                    &nbsp;&nbsp;Close
                  </>
                ) : (
                  <>
                    <FaIcons.FaUsers className="mb-1" />
                    &nbsp;&nbsp;Add Team
                  </>
                )}
                </button>
              </Container> : <div></div>
            }
            {/* Botón anteriormente ejecutado previo al call */}
            {/* <button className="btn btn-primary w-100" onClick={handleSearch}>
              <FaIcons.FaSearch className="mb-1" />
              &nbsp;&nbsp;Search
            </button> */}
          </div>
          {isAdmin ? 
            <Collapse in={collapse}>
              <div id="collapseProjectCreation" className="my-3">
                <TeamCreation setCollapse={setCollapse}/>
              </div>
            </Collapse> : <div></div>
          }
        </div>
      </div>
    </>
  );
};

export default TeamSearch;