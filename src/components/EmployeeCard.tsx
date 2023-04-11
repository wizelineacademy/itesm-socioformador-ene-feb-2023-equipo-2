// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import styles from './EmployeeCard.module.css';
import DataTable, { TableColumn} from 'react-data-table-component';

interface CardProps {
  pageType: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
}

const EmployeeCard = (props: CardProps) => {

  /*const [hideStatusIcon] = useState<boolean>(props.pageType === 'listForEmployee' ? true : false);
  const [hideTrashCan] = useState<boolean>(props.pageType === 'listForAdmin' ? false : true);
  const [hidePlusSign] = useState<boolean>(props.pageType === 'addToOrder' ? false : true);
  const [hideMinusSign] = useState<boolean>(props.pageType === 'OrderSummary' ? false : true);*/

  // BORRAR ESTAS 4 AL FINAL, SON PARA MOSTRAR TODAS
  const [hideStatusIcon] = useState<boolean>(props.pageType === 'showAll' ? false : true);
  const [hideTrashCan] = useState<boolean>(props.pageType === 'showAll' ? false : true);
  const [hidePlusSign] = useState<boolean>(props.pageType === 'showAll' ? false : true);
  const [hideMinusSign] = useState<boolean>(props.pageType === 'showAll' ? false : true);

  const handleEmployeeDelete = () => {
    alert("se va a eliminar el usuario del sistema");
  };

  const handleEmployeeSeeInfo = () => {
    alert("se va a redireccionar al perfil del usuario");
  };

  const handleEmployeeEraseFromProject = () => {
    alert("se va a eliminar el usuario de la lista de la orden");
  };

  const handleEmployeeAddToProject = () => {
    alert("se van a agregar el usuario a la lista de la orden");
  };

  const workAreaTag = () => {
    return (
      <>
        <div className='working-area-tag'> Frontend Developer</div>
      </>
    )
  }

  interface DataRow {
    employeeName: string;
    employeeLocation: string;
    employeeArea: string;
  }

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

  const columns: TableColumn<DataRow>[] = React.useMemo(
    () => [
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaRegDotCircle className='status-icon-size state-active-employee'/>
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
            fkjskfjdskljfls
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
      employeeName: 'Mario Isaí Robles Lozano',
      employeeLocation: 'Monterrey',
      employeeArea: 'Frontend Developer',
    },
    {
      employeeName: 'Jorge Eduardo De Leon Reyna',
      employeeLocation: 'Reynosa',
      employeeArea: 'Backendend Developer',
    },
    {
      employeeName: 'Andrea Catalina Fernandez Mena',
      employeeLocation: 'La Paz',
      employeeArea: 'Data Manager',
    },
    {
      employeeName: 'Andres Fuentes Alanis',
      employeeLocation: 'Guadalajara',
      employeeArea: 'Quality Manager',
    },
    {
      employeeName: 'Gerardo Mora Beltrán',
      employeeLocation: 'Queretaro',
      employeeArea: 'Cibersecurity',
    },
    {
      employeeName: 'Oscar Alejandro Reyna Mont.',
      employeeLocation: 'Guadalajara',
      employeeArea: 'Mobile Developer',
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
        />
      </div>
    </>
  )
}

export default EmployeeCard