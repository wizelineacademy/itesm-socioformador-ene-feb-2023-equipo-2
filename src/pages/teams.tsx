import React, {useState} from "react";
import Menu from "@/components/Menu";
import TeamSearch from "@/components/TeamSearch";
import TeamCreation from "@/components/TeamCreation";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import { useHasMounted } from "@/components/useHasMounted";
import * as FaIcons from "react-icons/fa";

const teams = () => {
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
        titulo={"Teams"}
        descripcion={
          "Manage teams of administrators and associates."
        }
      />
      <TeamSearch />
      <Container className="mt-3">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col className="d-flex flex-row-reverse">
            <button
              className="btn btn-primary"
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
          </Col>
        </Row>
      </Container>
      <Collapse in={collapse}>
        <div id="collapseProjectCreation" className="my-3">
          <TeamCreation />
        </div>
      </Collapse>
    </>
  );
};

export default teams;
