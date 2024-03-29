import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { useHasMounted } from "@/components/useHasMounted";


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
const TeamCreation = ({ setCollapse }) => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [employeesList, setEmployeesList] = useState<employeeSelectionInterface[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [missingField, setMissingField] = useState("");
  //const [teamMembersList, setTeamMembersList] = useState<employeeName[]>([]);

  const [name, setName] = useState("");
  
  let link = process.env.NEXT_PUBLIC_API_URL;

  // fetch of employees to later place in react-select.
  useEffect(() => {
    fetch(link + '/get-employees')
      .then(res => res.json())
      .then(data => {
        setEmployeesList(data.employees)
      })
      .catch(error => console.log("Error", error))
  }, [])

  const handleTeamCreation = (e : any | null) => {

    if (!name || !selectedEmployees) {
      setMissingField("Please fill in all fields");
      return;
    }

    const requestOptionsList = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamName: name,
                             teamMembers: selectedEmployees }),
    };

    fetch(link + "/createTeam", requestOptionsList)
      .then((response) => response.json())
      .then((data) => {
        //console.log('data', data)
      })
      .catch((error) => {
        console.log('Error ', error);
      });
    setSelectedEmployees([]);
    setName('');
    // @ts-ignore
    setCollapse(prevCollapse => !prevCollapse);
  };

  //Handle func for employees
  const handleChangeSelectEmployeeName = (e : any[] | null) => {
    if (e === null) {
      setSelectedEmployees([]);
    } else {
      const selectedValues = e.map((option) => option.value);
      setSelectedEmployees(selectedValues);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Container className="bg-light border p-4">
        <Row>
          <p>Please fill out the following fields to create a team:</p>
        </Row>
        <Row>
          <Col>
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              className="form-control"
              type="name"
              id="new-team-name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </Col>
          <Col>
            <div className="col-md">
              <label className="form-label">Members</label>
              {employeesList ? (
                <Select
                  id="new-team-members"
                  // @ts-ignore
                  onChange={handleChangeSelectEmployeeName}
                  value={employeesList.filter((obj) =>
                    selectedEmployees.includes(obj.value)
                  )}
                  options={employeesList}
                  isClearable
                  isMulti
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </Col>
          <Col>
            <label className="form-label">
              &nbsp;
            </label>
            <button id="create-team-button" className="btn btn-primary w-100" onClick={handleTeamCreation}>
              <FaIcons.FaPlus className="mb-1" />
              &nbsp;&nbsp;Add
            </button>
          </Col>
        </Row>
        <Row>
          {missingField && (
            <div className="row mt-3">
              <p className="text-danger">{missingField}</p>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default TeamCreation;
