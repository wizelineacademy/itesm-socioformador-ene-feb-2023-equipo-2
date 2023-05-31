import React, {useState} from "react";
import Menu from "@/components/Menu";

import TeamSearch from "@/components/TeamSearch";
import TeamCreation from "@/components/TeamCreation";
import TeamTable from "@/components/TeamTable";
import { useHasMounted } from "@/components/useHasMounted";

import { TeamContext, TeamListContext, TeamStatusContext } from "@/context/teamContext";
import { EmployeeContext, employeeContext, EmployeeListContext, employeeListContext } from "@/context/employeeContext";

const teams = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  // React Hooks for managing component state
  const [collapse, setCollapse] = useState(false);

  var isAdmin:Boolean = true;

  if (!hasMounted) {
    return null;
  }
  return (
    <>
    <TeamContext>
      <TeamListContext>
        <TeamStatusContext>
          <EmployeeContext>
            <EmployeeListContext>
              <Menu
                titulo={"Teams"}
                descripcion={
                  "Manage teams of administrators and associates."
                }
              />
              <TeamSearch />
              {/* {isAdmin ? <Container className="mt-3">
                <Row>
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
              </Container> : <div></div>}
              {isAdmin ? <Collapse in={collapse}>
                <div id="collapseProjectCreation" className="my-3">
                  <TeamCreation />
                </div>
              </Collapse> : <div></div>} */}
              <TeamTable />
            </EmployeeListContext>
          </EmployeeContext>
        </TeamStatusContext>
      </TeamListContext>
    </TeamContext>
    </>
  );
};

export default teams;
