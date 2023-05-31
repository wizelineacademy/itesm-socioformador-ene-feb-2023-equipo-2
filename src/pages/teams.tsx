import React, {useState} from "react";
import Menu from "@/components/Menu";

import TeamSearch from "@/components/TeamSearch";
import TeamList from "@/components/TeamList";
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
              <div className="container">
                <div className="d-flex flex-row">
                  <div className='col-3'>
                    <TeamList />
                  </div>
                  <div className='col-1'></div>
                  <div className='col-8'>
                    <TeamTable />
                  </div>
                </div>
              </div>
            </EmployeeListContext>
          </EmployeeContext>
        </TeamStatusContext>
      </TeamListContext>
    </TeamContext>
    </>
  );
};

export default teams;
