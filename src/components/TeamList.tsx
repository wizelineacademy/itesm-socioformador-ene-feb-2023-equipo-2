import React, { Fragment, useState } from "react";
import Menu from "@/components/Menu";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";
import { useEffect } from "react";

import TeamSearch from "@/components/TeamSearch";
import TeamCreation from "@/components/TeamCreation";
import EmployeeCard from "@/components/EmployeeTable";
import { useHasMounted } from "@/components/useHasMounted";
import { useContext } from "react";
import {
  employeeContext,
  EmployeeListContext,
  employeeListContext,
} from "@/context/employeeContext";
import {
  teamContext,
  teamListContext,
  TeamListContext,
} from "@/context/teamContext";
import { useRouter } from "next/router";
import _ from "cypress/types/lodash";
import { projectContext } from "@/context/projectsContext";

interface CardProps {
  pageType:
    | "listForAdmin"
    | "listForEmployee"
    | "addToOrder"
    | "OrderSummary"
    | "showAll";
}

let link = process.env.NEXT_PUBLIC_API_URL;

const TeamList = (props: CardProps) => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const router = useRouter();

  const employeesContext = useContext(employeeContext);
  const employeesListContext = useContext(employeeListContext);

  const teamsContext = useContext(teamContext);
  const teamsListContext = useContext(teamListContext);

  const [hideStatusIcon] = useState<boolean>(
    props.pageType === "listForEmployee" ? true : false
  );
  const [hideTrashCan] = useState<boolean>(
    props.pageType === "listForAdmin" ? false : true
  );
  const [hidePlusSign] = useState<boolean>(
    props.pageType === "addToOrder" ? false : true
  );
  const [hideMinusSign] = useState<boolean>(
    props.pageType === "OrderSummary" ? false : true
  );

  let projectID = router.query.slug;

  const handleEmployeeSeeInfo = () => {
    alert("se va a redireccionar al perfil del usuario");
  };

  const handleEmployeeDelete = () => {
    alert("se va a eliminar el usuario del sistema");
  };

  const handleEmployeeAddToProject = () => {
    alert("se van a agregar el usuario a la lista de la orden");
  };

  const handleEmployeeEraseFromProject = () => {
    alert("se va a eliminar el usuario de la lista de la orden");
  };

  const [projectTeamMembers, setProjectTeamMembers] = useState<
    teamMembersInterface[] | null
  >(null);

  useEffect(() => {
    fetch(link + "/joinTeamEmployeesFetch")
      .then((res) => res.json())
      .then((data) => {
        setProjectTeamMembers(data.teamMembers);
        console.log(data.teamMembers);
      })
      .catch((error) => console.log("Error", error));
  }, []);

  interface employeeSelectionInterface {
    value: string;
    label: string;
    linkedinlink: string;
    cvfile: string;
    profileimg: string;
    inforoadmap: string;
    idposition: number;
    email: string;
    password: string;
    location: string;
    infoabout: string;
    status: boolean;
  }

  interface teamSelectionInterface {
    value: string;
    label: string;
  }

  interface teamMembersInterface {
    value: string;
    employeename: string;
    location: string;
    idposition: string;
    departmentname: string;
    label: string;
    idproject: string;
    idteam: string;
  }

  const data = projectTeamMembers?.map((members) => {
    return {
      value: parseInt(members.value),
      label: members.label,
      employeename: members.employeename,
      location: members.location,
      idposition: members.idposition,
      departmentname: members.departmentname,
      idproject: members.idproject,
      idteam: parseInt(members.idteam),
    };
  });

  console.log(data);

  let teams = teamsListContext?.selectedTeam;
  let employees = employeesListContext?.selectedEmployee;

  // let filteredProjectTeamMembersData = projectID ? projectTeamMembersData?.filter(members => members.idproject === projectID) : projectTeamMembersData;
  // console.log(projectTeamMembersData);
  const data2 = teams?.map((team) => {
    return {
      value: team.value,
      label: team.label,
    };
  });

  let selectedTeamID = teamsContext?.currentTeam;
  let selectedEmployeeID = employeesContext?.currentEmployee;

  console.log(selectedEmployeeID);
  //console.log(selectedEmployeeID)

  let filteredData =
    selectedTeamID && selectedEmployeeID
      ? data?.filter(
          (members) => { 
            // @ts-ignore
            members.idteam === selectedTeamID && members.value === selectedEmployeeID 
          }
        )
      : selectedTeamID
      ? data?.filter((members) => {
        // @ts-ignore
        members.idteam === selectedTeamID
      })
      : selectedEmployeeID
      ? data?.filter((members) => {
        // @ts-ignore
        members.value === selectedEmployeeID
      })
      : data;

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#EDEDED",
        borderBottomColor: "#FFFFFF",
        borderRadius: "10px",
        outline: "1px solid #FFFFFF",
      },
    },
  };

  const columns: TableColumn<teamMembersInterface>[] = React.useMemo(
    () => [
      /*{
        cell: (row) => (
          <Fragment>
            <FaIcons.FaRegDotCircle className={`status-icon-size ${row.isActive === 1 ? 'state-active-employee' : 'state-inactive-employee'}`} />
          </Fragment>
        ),
        omit: hideStatusIcon,
        width: '50px',
      },*/
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaCircle style={{ color: "black", fontSize: "50px" }} />
          </Fragment>
        ),
        width: "50px",
      },

      {
        name: "Team Name",
        selector: (row) => row.label,
        sortable: true,
      },
      {
        name: "Member ID",
        selector: (row) => row.employeename,
        sortable: true,
      },

      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaInfoCircle
              style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
              onClick={() => handleEmployeeSeeInfo()}
            />
          </Fragment>
        ),
        width: "50px",
      },
      {
        cell: (row) => (
          <Fragment>
            <div
              onClick={() => {
                router.push({
                  pathname: "/team-modification",
                  query: { slug: row.idteam },
                });
              }}
            >
              <FaIcons.FaPencilAlt
                style={{ color: "black", fontSize: "18px", cursor: "pointer" }}
              />
            </div>
          </Fragment>
        ),
        width: "50px",
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaTrash
              style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
              onClick={() => handleEmployeeDelete()}
            />
          </Fragment>
        ),
        omit: hideTrashCan,
        width: "50px",
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaPlus
              style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
              onClick={() => handleEmployeeAddToProject()}
            />
          </Fragment>
        ),
        omit: hidePlusSign,
        width: "50px",
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaMinus
              style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
              onClick={() => handleEmployeeEraseFromProject()}
            />
          </Fragment>
        ),
        omit: hideMinusSign,
        width: "50px",
      },
    ],
    [hideTrashCan, hidePlusSign, hideMinusSign]
  );

  /*let selectedTeamID = teamsContext?.currentTeam;
  let selectedEmployeeID = employeesContext?.currentEmployee;
  
  let filteredData = selectedTeamID && selectedEmployeeID ? data?.filter(team => team.value === selectedTeamID && team.value === selectedTeamID) :
                        selectedTeamID ? data?.filter(team => team.value === selectedTeamID) :
                        selectedEmployeeID ? data?.filter(team => team.label === selectedEmployeeID) : data;*/

  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="container my-4">
        <DataTable
          columns={columns}
          // @ts-ignore
          data={filteredData}
          customStyles={customStyles}
          highlightOnHover
          //pointerOnHover
          pagination
        />
      </div>
    </>
  );
};

export default TeamList;
