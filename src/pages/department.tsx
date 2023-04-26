import React, { useState } from "react";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import Menu from "@/components/Menu";
import DepartmentSkillsSearch from "@/components/DepartmentSkillsSearch";
import DepartmentCreation from "../components/DepartmentCreation";
import DepartmentTable from "../components/DepartmentTable";
import { useHasMounted } from "@/components/useHasMounted";

import { DepartmentContextProvider } from '@/context/departmentContext';

const department = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  // React Hooks for managing component state
  const [collapse, setCollapse] = useState(false);

  if (!hasMounted) {
    return null;
  }

  return (
    //<>
    <DepartmentContextProvider>
      <>
        <Menu
          titulo="Department"
          descripcion="In order to establish a connection between skills and departments, it is necessary for them to be directly linked. Create a department to be later linked to various skills"
        />
        <DepartmentSkillsSearch />
        <Container className="mt-3">
          <Row>
            <Col></Col>
            <Col className="d-flex flex-row-reverse">
              <button
                className="btn btn-primary"
                onClick={() => setCollapse(!collapse)}
                aria-controls="collapseDepartmentCreation"
                aria-expanded={collapse}
              >
                {collapse ? (
                  <>
                    <FaIcons.FaTimes className="mb-1" />
                    &nbsp;&nbsp;Close
                  </>
                ) : (
                  <>
                    <FaIcons.FaClipboardList className="mb-1" />
                    &nbsp;&nbsp;Add Department
                  </>
                )}
              </button>
            </Col>
          </Row>
        </Container>
        <Collapse in={collapse}>
          <div id="collapseDepartmentCreation" className="my-3">
            <DepartmentCreation />
          </div>
        </Collapse>
        <DepartmentTable departmentName='senior dev'/>
      </>
    </DepartmentContextProvider>
    //</>
  )
};

export default department;
