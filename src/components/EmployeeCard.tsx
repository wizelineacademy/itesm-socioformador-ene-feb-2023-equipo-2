// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import DataTable, { TableColumn} from 'react-data-table-component';
import AreaBadge from "./AreaBadge";

interface CardProps {
  //pageType: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
  pageType: 'listForAdmin' | 'listForEmployee' | 'addToOrder' | 'OrderSummary' | 'showAll';
}

const EmployeeCard = (props: CardProps) => {

  const [hideStatusIcon] = useState<boolean>(props.pageType === 'listForEmployee' ? true : false);
  const [hideTrashCan] = useState<boolean>(props.pageType === 'listForAdmin' ? false : true);
  const [hidePlusSign] = useState<boolean>(props.pageType === 'addToOrder' ? false : true);
  const [hideMinusSign] = useState<boolean>(props.pageType === 'OrderSummary' ? false : true);

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

  interface DataRow {
    isActive: 0 | 1;
    employeeName: string;
    employeeLocation: string;
    employeeAreaBadge: string;
    employeeArea: string;
  }

  const columns: TableColumn<DataRow>[] = React.useMemo(
    () => [
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaRegDotCircle className={`status-icon-size ${row.isActive === 1 ? 'state-active-employee' : 'state-inactive-employee'}`} />
          </Fragment>
        ),
        omit: hideStatusIcon,
        width: '50px',
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
        selector: row => row.employeeName,
        sortable: true,
      },
      {
        name: 'Location',
        selector: row => row.employeeLocation,
      },
      /*{
        name: 'Area',
        selector: row => row.employeeArea,
      },*/
      {
        cell: (row) => (
          <Fragment>
              <AreaBadge workingAreaBagde={row.employeeAreaBadge} workingArea={row.employeeArea} />
          </Fragment>
        ),
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaListUl
              style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
              onClick={() => handleEmployeeSeeInfo()}/>
          </Fragment>
        ),
        width: '50px',
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaTrashAlt
                style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
                onClick={() => handleEmployeeDelete()}/>
          </Fragment>
        ),
        omit: hideTrashCan,
        width: '50px',
      },
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

  const data = [
    {
      isActive: 1,
      employeeName: 'Mario Isaí Robles Lozano',
      employeeLocation: 'Monterrey',
      employeeAreaBadge: 'Frontend Developer',
      employeeArea: 'frontend'
    },
    {
      isActive: 1,
      employeeName: 'Jorge Eduardo De Leon Reyna',
      employeeLocation: 'Reynosa',
      employeeAreaBadge: 'Backend Developer',
      employeeArea: 'backend'
    },
    {
      isActive: 0,
      employeeName: 'Andrea Catalina Fernandez Mena',
      employeeLocation: 'La Paz',
      employeeAreaBadge: 'Data Manager',
      employeeArea: 'data'
    },
    {
      isActive: 1,
      employeeName: 'Andres Fuentes Alanis',
      employeeLocation: 'Guadalajara',
      employeeAreaBadge: 'Quality Manager',
      employeeArea: 'quality'
    },
    {
      isActive: 0,
      employeeName: 'Gerardo Mora Beltrán',
      employeeLocation: 'Queretaro',
      employeeAreaBadge: 'Cibersecurity',
      employeeArea: 'cibersecurity'
    },
    {
      isActive: 0,
      employeeName: 'Oscar Alejandro Reyna Mont.',
      employeeLocation: 'Guadalajara',
      employeeAreaBadge: 'Mobile Developer',
      employeeArea: 'mobile'
    },
  ]

  return (
    <>
      <div className='container my-4'>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          highlightOnHover
          //pointerOnHover
          pagination
        />
      </div>
    </>
  )
}

export default EmployeeCard