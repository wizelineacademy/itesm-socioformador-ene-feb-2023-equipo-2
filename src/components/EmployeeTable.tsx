// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState, useContext, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import DataTable, { TableColumn} from 'react-data-table-component';
import TextBox from "./TextBox";
import { useRouter } from 'next/router';
import { employeeContext, employeeListContext } from "@/context/employeeContext";
import { roleContext } from "@/context/roleContext";

import { useUser } from '@auth0/nextjs-auth0/client';
import { getAuth0Id } from "@/utils/getAuth0Id";


const roleOptions = [
  { value: "1", label: "Wizeliner" },
  { value: "2", label: "Administrator" },
];

interface CardProps {
  //pageType: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
  pageType: 'listForAdmin' | 'listForEmployee' | 'addToOrder' | 'OrderSummary' | 'showAll';
}

const EmployeeTable = (props: CardProps) => {
  const employeesContext = useContext(employeeContext);
  const employeesListContext = useContext(employeeListContext);
  const rolesContext = useContext(roleContext);

  const router = useRouter();

  const [userInfo, setUserInfo] = useState<any>()
  const { user, error: errorAuth0, isLoading } = useUser();

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let id: number = getAuth0Id(user?.sub)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id
      }),
    };

    fetch(link + "/getUserInfoFromDB", requestOptions)
      .then((response) => response.json())
      .then((data) => setUserInfo(data))
      .catch((error) => console.error("Error al guardar ruta de aprendizaje"));
  }, [isLoading])

  const handleEmployeeSeeInfo = (id: any) => {
    //alert("se va a redireccionar al perfil del usuario");
    const encodedInfo = encodeURIComponent(id);
    window.location.href = `/profile-information?info=${encodedInfo}`;
    //console.log(id);
  };

  const handleEmployeeDelete = () => {
    alert("se va a eliminar el usuario del sistema");
  };

  const getPositionName = (positionId: any) => {
    const position = roleOptions.find(option => Number(option.value) === positionId);
    return position ? position.label : "";
  };
  


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

  let employees = employeesListContext?.selectedEmployee;

  const columns: TableColumn<employeeSelectionInterface>[] = React.useMemo(
    () => [
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaRegDotCircle
              className={`status-icon-size ${
                String(row.status) === 'true' ? "state-active" : "state-inactive" 
              }`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={String(row.status) === 'true' ? 'Employee is active' : 'Employee is not active' }
            />
          </Fragment>
        ),
        width: "50px",
        omit: userInfo?.idposition === 1 ? false : true,
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaCircle style={{color: 'black', fontSize: '50px'}}/>
          </Fragment>
        ),
        width: '50px',
      },
      {
        name: 'Name',
        selector: row => row.label,
        sortable: true,
      },
      {
        name: 'Email',
        selector: row => row.email,
      },
      /*{
        name: 'Rol',
        selector: row => getPositionName(row.idposition),
      },*/
      {
        name: 'LinkedIn Link',
        selector: row => row.linkedinlink,
      },
      {
        cell: (row) => (
          <Fragment>{row.idposition === 1 ? "admin" : ""}</Fragment>
        ),
        width: "150px",
        omit: userInfo?.idposition === 1 ? false : true,
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaInfoCircle
              style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
              onClick={() => handleEmployeeSeeInfo(row.value)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="View employee information"
            />
          </Fragment>
        ),
        width: '50px',
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaPencilAlt
              style={{color: 'black', fontSize: '18px', cursor: 'pointer'}} 
              onClick={() => router.push({pathname: '/employee-modification', query: { slug: row.value }})}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit employee information"
            />
          </Fragment>
        ),
        width: '70px',
        omit: userInfo?.idposition === 1 ? false : true,
      },
    ],
    [userInfo],
  );

  const data = employees?.map((employee) => {
    return {
      value: employee.value,
      label: employee.label,
      linkedinlink: employee.linkedinlink,
      cvfile: employee.cvfile,
      profileimg: employee.profileimg,
      inforoadmap: employee.inforoadmap,
      idposition: employee.idposition,
      email: employee.email,
      password: employee.password,
      location: employee.location,
      infoabout: employee.infoabout,
      status: employee.status,
    }
  })
  
  let selectedEmployeeID = employeesContext?.currentEmployee;
  let selectedRoleID = rolesContext?.currentRole;

  let filteredEmployeeData = selectedEmployeeID ? data?.filter(employee => employee.value === selectedEmployeeID) : data;
   filteredEmployeeData = selectedEmployeeID && selectedRoleID ? data?.filter(employee => employee.idposition.toString() === selectedRoleID && employee.value === selectedEmployeeID) :
                        // @ts-ignore
                        selectedRoleID ? data?.filter(employee => employee.idposition.toString() === selectedRoleID) :
                        // @ts-ignore
                        selectedEmployeeID ? data?.filter(employee => employee.value === selectedEmployeeID) :
                        // @ts-ignore                        
                        data;

  return (
    <>
      <div className='container my-4'>
        <DataTable
          columns={columns}
          // @ts-ignore
          data={filteredEmployeeData}
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