// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import DataTable, { TableColumn} from 'react-data-table-component';
import TextBox from "./TextBox";

interface CardProps {
  //pageType: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
  pageType: 'listForAdmin' | 'listForEmployee' | 'addToOrder' | 'OrderSummary' | 'showAll';
}

const EmployeeTable = (props: CardProps) => {

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
    id: number;
    name: string;
    idposition: 1 | 2;
    location: string;
    employeeAreaBadge: string;
    employeeArea: string;
  }

  const columns: TableColumn<DataRow>[] = React.useMemo(
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
        selector: row => row.name,
        sortable: true,
      },
      {
        name: 'Location',
        selector: row => row.location,
      },
      {
        cell: (row) => (
          <Fragment>
            {row.idposition === 2 ? 'admin' : ''},
          </Fragment>
        ),
      },
      {
        cell: (row) => (
          <Fragment>
              <TextBox textBoxText={row.employeeAreaBadge} textBoxColorScheme={row.employeeArea} />
          </Fragment>
        ),
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaInfoCircle
              style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
              onClick={() => handleEmployeeSeeInfo()}/>
          </Fragment>
        ),
        width: '50px',
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaTrash
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
      id: 1,
      name: 'Mario Isaí Robles Lozano',
      idposition: 1,
      location: 'Monterrey',
      employeeAreaBadge: 'Frontend Developer',
      employeeArea: 'frontend'
    },
    {
      id: 2,
      name: 'Jorge Eduardo De Leon Reyna',
      idposition: 2,
      location: 'Reynosa',
      employeeAreaBadge: 'Backend Developer',
      employeeArea: 'backend'
    },
    {
      id: 3,
      name: 'Andrea Catalina Fernandez Mena',
      idposition: 1,
      location: 'La Paz',
      employeeAreaBadge: 'Data Manager',
      employeeArea: 'data'
    },
    {
      id: 4,
      name: 'Andres Fuentes Alanis',
      idposition: 2,
      location: 'Guadalajara',
      employeeAreaBadge: 'Quality Manager',
      employeeArea: 'quality'
    },
    {
      id: 5,
      name: 'Gerardo Mora Beltrán',
      idposition: 1,
      location: 'Queretaro',
      employeeAreaBadge: 'Cibersecurity',
      employeeArea: 'cibersecurity'
    },
    {
      id: 6,
      name: 'Oscar Alejandro Reyna Mont.',
      idposition: 1,
      location: 'Guadalajara',
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

export default EmployeeTable