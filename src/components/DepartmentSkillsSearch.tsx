import React, {useState, useContext, useEffect} from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useHasMounted } from "@/components/useHasMounted";

import { departmentContext } from '@/context/departmentContext';

const options = [
  { value: "juan-garcia", label: "Juan García" },
  { value: "ana-gonzalez", label: "Ana González" },
  { value: "jose-martinez", label: "José Martínez" },
  { value: "maria-hernandez", label: "María Hernández" },
  { value: "carlos-perez", label: "Carlos Pérez" },
];

const DepartmentSkillsSearch = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  //const [selectedDepartment, setSelectedDepartment] = useState<string>();
  const selectedDepartment = useContext(departmentContext)

  // const handleChangeTechnology = (selectedOptions: ValueType<OptionTypeBase>) works as well but with the error.
  // The above commented out code can be used as an alternative, but it may result in an error.
  // In this implementation, the type of `selectedOptions` is set to `any` to prevent the error.
  const handleDepartmentSelection = (selectedOption: any) => {
    //setSelectedDepartment(selectedOption);
    if (selectedDepartment) {
      selectedDepartment.setSelectedDepartment(selectedOption)
      console.log(selectedOption);
    }
  };

  if (!hasMounted) {
    return null;
  }

  //useEffect(() => {console.log(selectedField)}, [selectedField]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <label className="form-label">Department Name:</label>
            <Select isClearable options={options} onChange={handleDepartmentSelection}/>
          </Col>
          <Col>
            <label className="form-label">Skills:</label>
            <Select isClearable options={options} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DepartmentSkillsSearch