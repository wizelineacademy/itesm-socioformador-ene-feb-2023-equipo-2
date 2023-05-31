// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import DataTable, { TableColumn} from 'react-data-table-component';
import TextBox from "./TextBox";


import { useContext } from 'react'
import { employeeContext, EmployeeListContext, employeeListContext } from "@/context/employeeContext";

interface CardProps {
  //pageType: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
  pageType: 'listForAdmin' | 'listForEmployee' | 'addToOrder' | 'OrderSummary' | 'showAll';
}

const EmployeeTable = (props: CardProps) => {
  const employeesContext = useContext(employeeContext);
  const employeesListContext = useContext(employeeListContext);

  const [hideStatusIcon] = useState<boolean>(props.pageType === 'listForEmployee' ? true : false);
  const [hideTrashCan] = useState<boolean>(props.pageType === 'listForAdmin' ? false : true);
  const [hidePlusSign] = useState<boolean>(props.pageType === 'addToOrder' ? false : true);
  const [hideMinusSign] = useState<boolean>(props.pageType === 'OrderSummary' ? false : true);

  // BORRAR ESTAS 4 AL FINAL Y PONER LAS 4 DE ARRIBA, SON PARA MOSTRAR TODAS
  // const [hideStatusIcon] = useState<boolean>(props.pageType === 'showAll' ? false : true);
  // const [hideTrashCan] = useState<boolean>(props.pageType === 'showAll' ? false : true);
  // const [hidePlusSign] = useState<boolean>(props.pageType === 'showAll' ? false : true);
  // const [hideMinusSign] = useState<boolean>(props.pageType === 'showAll' ? false : true);


  const handleEmployeeSeeInfo = (id: any) => {
    //alert("se va a redireccionar al perfil del usuario");
    const encodedInfo = encodeURIComponent(id);
    window.location.href = `/profileInformation?info=${encodedInfo}`;
    //console.log(id);
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
            <FaIcons.FaCircle style={{color: 'black', fontSize: '50px'}}/>
          </Fragment>
        ),
        width: '50px',
      },
      {
        name: 'Name',
        selector: row => row.label,
        sortable: true,
        width: '110px',
      },
      {
        name: 'LinkedIn Link',
        selector: row => row.linkedinlink,
        //width: '200px',
      },
      {
        name: 'CV File',
        selector: row => row.cvfile,
        width: '100px',
      },
      {
        name: 'Profile Image',
        selector: row => row.profileimg,
        width: '100px',
      },
      {
        name: 'Roadmap Information',
        selector: row => row.inforoadmap,
        width: '100px',
      },
      {
        name: 'Email',
        selector: row => row.email,
        width: '150px',
      },
      /*{
        name: 'Password',
        selector: row => row.password,
        width: '100px',
      },*/
      {
        name: 'Location',
        selector: row => row.location,
        width: '150px',
      },
      {
        name: 'About',
        selector: row => row.infoabout,
        width: '100px',
      },
      {
        name: 'Status',
        selector: row => String(row.status),
        width: '100px',
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaInfoCircle
              style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
              onClick={() => handleEmployeeSeeInfo(row.value)}/>
          </Fragment>
        ),
        width: '50px',
      },
      // {
      //   cell: (row) => (
      //     <Fragment>
      //       <FaIcons.FaTrash
      //           style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
      //           onClick={() => handleEmployeeDelete()}/>
      //     </Fragment>
      //   ),
      //   omit: hideTrashCan,
      //   width: '50px',
      // },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaPlus
                style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
                onClick={() => handleEmployeeAddToProject()}/>
          </Fragment>
        ),
        omit: hidePlusSign,
        width: '50px',
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaMinus
                style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
                onClick={() => handleEmployeeEraseFromProject()}/>
          </Fragment>
        ),
        omit: hideMinusSign,
        width: '50px',
      },
    ],
    [hideTrashCan, hidePlusSign, hideMinusSign],
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
  let filteredData = selectedEmployeeID ? data?.filter(employee => employee.value === selectedEmployeeID) : data;

  return (
    <>
      <div className='container my-4'>
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
  )
}

export default EmployeeTable