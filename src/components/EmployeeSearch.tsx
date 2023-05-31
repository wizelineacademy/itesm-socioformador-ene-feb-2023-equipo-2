// TODO:
// Cambiar los inputs por select boxes
// https://react-select.com/home

import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";
import EmployeeTable from "@/components/EmployeeTable";
import EmployeeCreation from "@/components/EmployeeCreation";
import Collapse from 'react-bootstrap/Collapse';

import { useContext } from 'react'
import { employeeContext, EmployeeListContext, employeeListContext } from "@/context/employeeContext";

const specialityOptions = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "data", label: "Data Manager" },
  { value: "quality", label: "Quality Manager" },
  { value: "cibersecurity", label: "Cibersecurity" },
  { value: "networks", label: "Network Administrator" },
  { value: "mobile", label: "Mobile Developer" },
];

const techOptions = [
  { value: "c", label: "C/C++" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "cs", label: "C#" },
  { value: "react", label: "REACT" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwind", label: "Tailwind" },
  { value: "remix", label: "REMIX" },
  { value: "nextjs", label: "Next JS" },
];

const locationOptions = [
  { value: "monterrey", label: "Monterrey" },
  { value: "saltillo", label: "Saltillo" },
  { value: "reynosa", label: "Reynosa" },
  { value: "victoria", label: "Ciudad Victoria" },
  { value: "lapaz", label: "La Paz" },
  { value: "guadalajara", label: "Guadalajara" },
  { value: "queretaro", label: "Queretaro" },
];

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

const EmployeeSearch = () => {
  const employeesContext = useContext(employeeContext);
  const employeesListContext = useContext(employeeListContext);

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  let link = process.env.NEXT_PUBLIC_API_URL;

  const [employeeName, setEmployeeName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  /*const handleChangeSelectEmployeeName = (e: any | null) => {
    e === null ? setEmployeeName("") : setEmployeeName(e.value);
    console.log(e.value);
  };*/

  const handleChangeSelectEmployeeName = (e: any | null) => {
    if (e === null) {
      setEmployeeName("");
    } else {
      setEmployeeName(e.value);
      employeesContext?.setCurrentEmployee(e.value);
      console.log(employeesContext?.currentEmployee)
      console.log(employeesListContext?.selectedEmployee)
    }
  };

  const handleChangeSelectTeamName = (e: any | null) => {
    e === null ? setTeamName("") : setTeamName(e.value);
  };

  const handleChangeSelectRole = (e: any | null) => {
    e === null ? setRole("") : setRole(e.value);
  };

  const handleChangeSelectDepartment = (e: any | null) => {
    e === null ? setDepartment("") : setDepartment(e.value);
  };

  const [employeesList, setEmployeesList] = useState<employeeSelectionInterface[]>([]);

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

  const handleSearch = (e: any) => {
    alert("buscando");
  };
  //Hook for add new employee
  const [addEmployee, setAddEmployee] = useState(false); // True -> A to Z, False -> Z to A

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="container my-4">
        {/*for searching employees by their name*/}
        <div className="row">
          <div className="col-md">
            <label className="form-label">Employee Name:</label>
            <Select
              onChange={handleChangeSelectEmployeeName}
              value={employeesList.find(
                (obj) => obj.value === employeeName
              )}
              options={employeesList}
              isClearable
            />
          </div>

          <div className="col-md">
            <label className="form-label">Team:</label>
            <Select
              onChange={handleChangeSelectTeamName}
              value={specialityOptions.find((obj) => obj.value === teamName)}
              options={specialityOptions}
              isClearable
            />
          </div>
          <div className="col-md">
            <label className="form-label">Role:</label>
            <Select
              onChange={handleChangeSelectRole}
              value={specialityOptions.find((obj) => obj.value === role)}
              options={specialityOptions}
              isClearable
            />
          </div>
          <div className="col-md">
            <label className="form-label">Department:</label>
            <Select
              onChange={handleChangeSelectDepartment}
              value={specialityOptions.find((obj) => obj.value === department)}
              options={specialityOptions}
              isClearable
            />
          </div>
          <div className="col-md">
            <label className="form-label">&nbsp;</label>
            <button
              className="btn btn-primary w-100"
              onClick={() => setAddEmployee(!addEmployee)}
              aria-controls="employeeCreation"
              aria-expanded={addEmployee}>
              {addEmployee ? (
                <>
                  <FaIcons.FaTimes className="mb-1" />
                  &nbsp;&nbsp;Close
                </>
              ) : (
                <>
                  <FaIcons.FaUserCog className="mb-1" />
                  &nbsp;&nbsp;Add Employee
                </>
              )}
            </button>
            {/* <button className="btn btn-primary w-100" onClick={handleSearch}>
              <FaIcons.FaSearch className="mb-1" />
              &nbsp;&nbsp;Search
            </button> */}
          </div>
          <Collapse in={addEmployee}>
            <div id="employeeCreation" className="my-3">
              <EmployeeCreation />
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default EmployeeSearch;
