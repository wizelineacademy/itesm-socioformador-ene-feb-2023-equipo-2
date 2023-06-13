import React, { useEffect, useState, useContext } from "react";
import { Container, Collapse } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";
import TeamCreation from "@/components/TeamCreation";

import { teamContext, teamListContext } from "@/context/teamContext";
import { employeeContext, employeeListContext } from "@/context/employeeContext";

import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0/client';
import { getAuth0Id } from "@/utils/getAuth0Id";


//Interface for teams
interface teamSelectionInterface {
  value: string,
  label: string,
  isactive: string,
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

  const [userInfo, setUserInfo] = useState<any>()

  const router = useRouter();
  const { user, error: errorAuth0, isLoading } = useUser();

  let link = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    fetch(link + '/get-teams')
      .then(res => res.json())
      .then(data => {
        setTeamList(data.teams)
        teamsListContext?.setSelectedTeamList(data.teams);
      })
      .catch(error => console.log("Error ", error))

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
  const handleChangeSelect = (e: any | null) => {
    if (e === null) {
      setName("");
    } else {
      setName(e.value);
      teamsContext?.setCurrentTeam(e.value);
    }
  };

  //Handle func for employees
  const handleChangeSelectEmployeeName = (e: any | null) => {
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
                  id="team-names-select"
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
                  id="members-names-select"
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
            {userInfo?.idposition === 1 ? (
              <div className="col-md-2">
                <label className="form-label">&nbsp;</label>
                <Container className="mt">
                  <button
                    id="team-creation-button"
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
                </Container>
              </div>
              ) : <div></div>
            }
            {userInfo?.idposition === 1 ? (
              <Collapse in={collapse}>
                <div id="collapseProjectCreation" className="my-3">
                  <TeamCreation setCollapse={setCollapse} />
                </div>
              </Collapse>
              ) : <div></div>
            }
          </div>
        </div>
    </>
  );
};

export default TeamSearch;