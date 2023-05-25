// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState, useEffect} from 'react';
import * as FaIcons from 'react-icons/fa';
import DataTable, { TableColumn} from 'react-data-table-component';
import TextBox from "./TextBox";

import { useContext } from 'react'
import { employeeContext, EmployeeListContext, employeeListContext } from "@/context/employeeContext";
import { teamContext, teamListContext, TeamListContext } from "@/context/teamContext";

import { useRouter } from "next/router";

let link = process.env.NEXT_PUBLIC_API_URL;

interface CardProps {
  //pageType: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
  pageType: 'listForAdmin' | 'listForEmployee' | 'addToOrder' | 'OrderSummary' | 'showAll';
}

const EmployeeTable = (props: CardProps) => {
  const router = useRouter();

  const employeesContext = useContext(employeeContext);
  const employeesListContext = useContext(employeeListContext);
  const teamsContext = useContext(teamContext);
  const teamsListContext = useContext(teamListContext);

  const [hideStatusIcon] = useState<boolean>(props.pageType === 'listForEmployee' ? true : false);
  const [hideTrashCan] = useState<boolean>(props.pageType === 'listForAdmin' ? false : true);
  const [hidePlusSign] = useState<boolean>(props.pageType === 'addToOrder' ? false : true);
  const [hideMinusSign] = useState<boolean>(props.pageType === 'OrderSummary' ? false : true);

  let teamID = router.query.slug;

  // BORRAR ESTAS 4 AL FINAL Y PONER LAS 4 DE ARRIBA, SON PARA MOSTRAR TODAS
  // const [hideStatusIcon] = useState<boolean>(props.pageType === 'showAll' ? false : true);
  // const [hideTrashCan] = useState<boolean>(props.pageType === 'showAll' ? false : true);
  // const [hidePlusSign] = useState<boolean>(props.pageType === 'showAll' ? false : true);
  // const [hideMinusSign] = useState<boolean>(props.pageType === 'showAll' ? false : true);


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

  const customStyles = {
    rows: {
        style: {
          minHeight: '50px',
        },
        highlightOnHoverStyle: {
          backgroundColor: '#EDEDED',
          borderBottomColor: '#FFFFFF',
          borderRadius: '10px',
          outline: '1px solid #FFFFFF',
        },
    },
  };

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

  let selectedTeamID = teamsContext?.currentTeam;
  let selectedEmployeeID = employeesContext?.currentEmployee;

  const columns: TableColumn<teamMembersInterface>[] = React.useMemo(
    () => [
      /*{
        cell: (row) => (
          <Fragment>
            <FaIcons.FaRegDotCircle className={`status-icon-size ${ row.isActive === 1 ? 'state-active-employee' : 'state-inactive-employee'}`} />
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
        name: "Team ID",
        selector: (row) => row.idteam,
        sortable: true,
      },
      {
        name: "Team Name",
        selector: (row) => row.label,
        sortable: true,
      },
      {
        name: "Member Name",
        selector: (row) => row.employeename,
        sortable: true,
      },
      {
        name: "Location",
        selector: (row) => row.location,
        sortable: true,
      },
      {
        name: "Department Name",
        selector: (row) => row.departmentname,
        sortable: true,
      },

      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaInfoCircle
              style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
              onClick={() => {router.push({pathname: '/employees', query: { slug: row.value },});}}
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

  let selectedTeamIDInt = parseInt(selectedTeamID);
  let selectedEmployeeIDInt = parseInt(selectedEmployeeID);

  console.log("Employee " + selectedEmployeeID)
  console.log("Team " + selectedTeamID)
  
  console.log(selectedTeamID != "" && selectedTeamID != "undefined" && selectedTeamID != "0" && selectedTeamID != null)

  let filteredData = (selectedEmployeeID != "" && selectedTeamID != "" && selectedEmployeeID != "undefined" && selectedTeamID != "undefined" && selectedEmployeeID != "0" && selectedTeamID != "0" && selectedEmployeeID != null && selectedTeamID != null) ? data?.filter(employee => employee.value === selectedEmployeeIDInt && employee.idteam === selectedTeamIDInt) :
                      selectedEmployeeID != "" && selectedEmployeeID != "undefined" && selectedEmployeeID != "0" && selectedEmployeeID != null ? data?.filter(employee => employee.value === selectedEmployeeIDInt) :
                      selectedTeamID != "" && selectedTeamID != "undefined" && selectedTeamID != "0" && selectedTeamID != null ? data?.filter(employee => employee.idteam === selectedTeamIDInt) : data

  return (
    <>
      <div className='container my-4'>
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          highlightOnHover
          //pointerOnHover
          pagination
        />
      </div>
    </>
  )
}

export default EmployeeTable