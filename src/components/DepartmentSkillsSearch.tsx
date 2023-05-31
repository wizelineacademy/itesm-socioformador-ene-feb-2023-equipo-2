import React, {useState, useContext, useEffect} from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useHasMounted } from "@/components/useHasMounted";

import { departmentContext } from '@/context/departmentContext';

interface departmentInterface {
  label: string;
  value: string;
}

const DepartmentSkillsSearch = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  // TODO: MARIO CÓDIGO
  //const [selectedDepartment, setSelectedDepartment] = useState<string>();
  const selectedDepartment = useContext(departmentContext)

  // const handleChangeTechnology = (selectedOptions: ValueType<OptionTypeBase>) works as well but with the error.
  // The above commented out code can be used as an alternative, but it may result in an error.
  // In this implementation, the type of `selectedOptions` is set to `any` to prevent the error.
  const handleDepartmentSelection = (selectedOption: any) => {
    //setSelectedDepartment(selectedOption);
    if (selectedDepartment) {
      selectedDepartment.setSelectedDepartment(selectedOption)
      //console.log(selectedOption);
    }
  };

  let link = process.env.NEXT_PUBLIC_API_URL; 
  const [department, setDepartment] = useState("")
  const [departmentList, setDepartmentList] = useState<departmentInterface[]>([]);
  // const [skill, setSkill] = useState("")
  // const [skillList, setSkillList] = useState([])

  const handleChangeSelectedDepartment = (e : any | null) => {
    e === null ? setDepartment("") : setDepartment(e.value);
    if (selectedDepartment) {
      selectedDepartment.setSelectedDepartment(e)
      //console.log(e);
    }
  }

  useEffect(() => {
    fetch(link + '/get-departments')
      .then(res => res.json())
      .then(data => {
        setDepartmentList(data.departments)
      })
      .catch(error => console.log("Error", error))
  }, [])

  // const handleChangeSelectedSkill = (e : any | null) => {
  //   e === null ? setSkill("") : setSkill(e.value);
  // }

  // useEffect(() => {
     fetch(link + '/get-skills')
  //     .then(res => res.json())
  //     .then(data => {
  //       setSkillList(data.skills)
  //     })
  //     .catch(error => console.log("Error", error))
  // }, [])

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <label className="form-label">Department Name:</label>
            {/* <Select isClearable options={deptOptions} onChange={handleDepartmentSelection}/> */}
            <Select
              onChange={handleChangeSelectedDepartment}
              value={departmentList.find(
                (obj) => obj.value === department
              )}
              options={departmentList}
              isClearable
            />
            {/* <p>{selectedDepartment?.selectedDepartment?.label}</p> */}
          </Col>
          <Col>
            <label className="form-label">Skills:</label>
            {/* <Select
              onChange={handleChangeSelectedSkill}
              value={skillList.find(
                (obj) => obj.value === skill
              )}
              options={skillList}
              isClearable
            /> */}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DepartmentSkillsSearch