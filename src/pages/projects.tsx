// TODO:

// Component orders.tsx, that decides what to show if the user is an admin or a colaborator.

// The presentation of the order management features has not been decided yet.
// It could be implemented as a pop-up, another page, or as part of the same page.
// Some of the features that we want to include are:
// - Add button: This button will allow the user to add new orders to the system.
// - Edit button: This button will allow the user to edit existing orders.
// - Delete button: This button will allow the user to delete orders from the system.
// Colaborators will just see the orders they are in, they won´t be able to use this buttons, just see the orders in which they are placed.

// To make it easier for users to find specific orders, we will also include an OrderSearch.tsx component.
// This component will allow users to search for orders by customer name, order ID, or other criteria.

// We will display a table showing all the orders in the system.
// This table will include basic information about each order, such as order ID, company, etc.

import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import Select from "react-select";
import { Container, Row, Col, Collapse } from "react-bootstrap";
// Remeber to use ValueType and OptionTypeBase. It shows error but it works.
// import Select, { ValueType, OptionTypeBase } from 'react-select';
import Menu from "@/components/Menu";
import ProjectSearch from "@/components/ProjectSearch";
import ProjectCreation from "@/components/ProjectCreation";
import ProjectTable from "@/components/ProjectTable";
import { useHasMounted } from "@/components/useHasMounted";

import { ProjectListContext, ProjectContext } from "@/context/projectsContext";

// 'options' will later be replaced by table skills in database
const listOfClients = [
  { value: "JohnDoeID", label: "John Doe" },
  { value: "AndresFuentesID", label: "Andres Fuentes" },
  { value: "CatalinaFernandezID", label: "Catalina Fernandez" },
];

const projects = () => {
  const hasMounted = useHasMounted();

  // React Hooks for managing component state
  const [collapse, setCollapse] = useState(false);

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  return (
    <ProjectListContext>
      <ProjectContext>
        <Menu
          titulo={"Projects"}
          descripcion={
            "Project administration panel to edit existing projects or create new ones for effective project management."
          }
        />
        <ProjectSearch />
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
                    <FaIcons.FaClipboardList className="mb-1" />
                    &nbsp;&nbsp;Add Project
                  </>
                )}
              </button>
            </Col>
          </Row>
        </Container>
        <Collapse in={collapse}>
          <div id="collapseProjectCreation" className="my-3">
            <ProjectCreation />
          </div>
        </Collapse>
        <ProjectTable />
      </ProjectContext>
    </ProjectListContext>
  );
};

export default projects;
