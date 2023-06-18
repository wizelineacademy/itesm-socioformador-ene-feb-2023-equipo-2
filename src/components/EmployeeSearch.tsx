// TODO:
// Cambiar los inputs por select boxes
// https://react-select.com/home

import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";
import EmployeeCreation from "@/components/EmployeeCreation";
import Collapse from 'react-bootstrap/Collapse';

import { employeeContext, employeeListContext } from "@/context/employeeContext";
import { roleContext } from "@/context/roleContext";

import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0/client';
import { getAuth0Id } from "@/utils/getAuth0Id";

const roleOptions = [
  { value: "1", label: "Administrator" },
  { value: "2", label: "Wizeliner" },
  { value: "3", label: "Cliente" },
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
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const employeesContext = useContext(employeeContext);
  const employeesListContext = useContext(employeeListContext);
  const rolesContext = useContext(roleContext);

  const [employeesList, setEmployeesList] = useState<employeeSelectionInterface[]>([]);

  const [employeeName, setEmployeeName] = useState("");
  const [role, setRole] = useState("");

  const [userInfo, setUserInfo] = useState<any>()

  const router = useRouter();
  const { user, isLoading } = useUser();

  let link = process.env.NEXT_PUBLIC_API_URL;

  // fetch of employees to later place in react-select.
  useEffect(() => {
    fetch(link + '/get-employees')
      .then(res => res.json())
      .then(data => {
        setEmployeesList(data.employees)
        employeesListContext?.setSelectedEmployeeList(data.employees);
      })
      .catch(error => console.log("Error", error))

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

  const handleChangeSelectEmployeeName = (e: any | null) => {
    if (e === null) {
      setEmployeeName("");
    } else {
      setEmployeeName(e.value);
      employeesContext?.setCurrentEmployee(e.value);
    }
  };

  const handleChangeSelectRole = (e: any | null) => {
    if (e === null) {
      setRole("");
    } else {
      setRole(e.value);
      rolesContext?.setCurrentRole(e.value);
    }
  };

  useEffect(() => {
  }, [employeesContext?.setCurrentEmployee(employeeName)]);

  useEffect(() => {
  }, [rolesContext?.setCurrentRole(role)]);

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
            <label className="form-label">User&apos;s Name:</label>
            <Select
              id = "selectUser"
              onChange={handleChangeSelectEmployeeName}
              value={employeesList.find(
                (obj) => obj.value === employeeName
              )}
              options={employeesList}
              isClearable
            />
          </div>
          <div className="col-md">
            <label className="form-label">Role:</label>
            <Select
              id="selectRole"
              onChange={handleChangeSelectRole}
              value={roleOptions.find((obj) => obj.value === role)}
              options={roleOptions}
              isClearable
            />
          </div>
          {userInfo?.idposition === 1 ? (
            <div className="col-md">
              <label className="form-label">&nbsp;</label>
              <button
                id="showEmployeecreation"
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
                    &nbsp;&nbsp;Add Users
                  </>
                )}
              </button>
            </div>
            ) : <div></div>
          }
          {userInfo?.idposition === 1 ? (
            <Collapse in={addEmployee}>
              <div id="employeeCreation" className="my-3">
                <EmployeeCreation />
              </div>
            </Collapse>
            ) : <div></div>
          }
        </div>
      </div>
    </>
  );
};

export default EmployeeSearch;
