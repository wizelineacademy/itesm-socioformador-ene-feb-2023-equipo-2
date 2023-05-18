import React, {useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";

// const options = [
//   { value: "juan-garcia", label: "Juan García" },
//   { value: "ana-gonzalez", label: "Ana González" },
//   { value: "jose-martinez", label: "José Martínez" },
//   { value: "maria-hernandez", label: "María Hernández" },
//   { value: "carlos-perez", label: "Carlos Pérez" },
// ];

import { useContext } from 'react';
import { teamContext, teamListContext, TeamListContext } from "@/context/teamContext";
import { employeeContext, EmployeeListContext, employeeListContext } from "@/context/employeeContext";
import { any } from "cypress/types/bluebird";
import { idText } from "typescript";

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
  const [employeesList, setEmployeesList] = useState<employeeSelectionInterface[]>([]);
  const [employeeName, setEmployeeName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  
  let link = process.env.NEXT_PUBLIC_API_URL;
  let employees = employeesListContext?.selectedEmployee;


  useEffect(() => {
    fetch(`${link}/get-teams?id=${name}`)
      .then(res => res.json())
      .then(data => {
        setTeamList(data.teams)
        teamsListContext?.setSelectedTeamList(data.team);
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

  //  const options = [
  //    { value: "1", label: "one" },
  //    { value: "2", label: "two" },
  //  ];


  // const options = [
  //   { value: "1", label: "one" },
  //   { value: "2", label: "two" },
  // ];

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
      console.log(employeesContext?.currentEmployee)
      console.log(employeesListContext?.selectedEmployee)
    }
  };

  const handleSearch = (e : any) => {
    alert("buscando")
  }

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
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              <FaIcons.FaSearch className="mb-1" />
              &nbsp;&nbsp;Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamSearch;
