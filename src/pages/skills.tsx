import React, { useState } from "react";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import Menu from "@/components/Menu";
import DepartmentSkillsSearch from "@/components/DepartmentSkillsSearch";
import SkillsCreation from "@/components/SkillsCreation";
import { useHasMounted } from "@/components/useHasMounted";

const skills = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  // React Hooks for managing component state
  const [collapse, setCollapse] = useState(false);

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <Menu
        titulo="Skills"
        descripcion="To utilize the following section, it is necessary to have already created the Departments in the database or to have them established beforehand."
      />
      <DepartmentSkillsSearch />
      <Container className="mt-3">
        <Row>
          <Col></Col>
          <Col className="d-flex flex-row-reverse">
            <button
              className="btn btn-primary"
              onClick={() => setCollapse(!collapse)}
              aria-controls="collapseSkillsCreation"
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
                  &nbsp;&nbsp;Add Skills
                </>
              )}
            </button>
          </Col>
        </Row>
      </Container>
      <Collapse in={collapse}>
        <div id="collapseSkillsCreation" className="my-3">
          <SkillsCreation />
        </div>
      </Collapse>
    </>
  );
};

export default skills;
