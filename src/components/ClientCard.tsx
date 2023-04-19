// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import DataTable, { TableColumn} from 'react-data-table-component';
import AreaBadge from "./AreaBadge";


const ClientCard = () => {

  const handleClientSeeProjects = () => {
    alert("se va a redireccionar al perfil del usuario");
  };

  const handleClientEraseFromSystem = () => {
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
    clientName: string;
    clientLocation: string;
    clientEnterprise: string;
  }

  const columns: TableColumn<DataRow>[] = [
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaRegDotCircle className={`status-icon-size ${row.isActive === 1 ? 'state-active-employee' : 'state-inactive-employee'}`} />
          </Fragment>
        ),
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
        selector: row => row.clientName,
        sortable: true,
      },
      {
        name: 'Location',
        selector: row => row.clientLocation,
      },
      {
        name: 'Company',
        selector: row => row.clientEnterprise,
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaListUl
              style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
              onClick={() => handleClientSeeProjects()}/>
          </Fragment>
        ),
        width: '50px',
      },
      {
        cell: (row) => (
          <Fragment>
            <FaIcons.FaMinus
                style={{color: 'black', fontSize: '50px', cursor: 'pointer'}} 
                onClick={() => handleClientEraseFromSystem()}/>
          </Fragment>
        ),
        width: '50px',
      },
    ];

  const data = [
    {
      isActive: 1,
      clientName: 'Mario Isaí Robles Lozano',
      clientLocation: 'Monterrey',
      clientEnterprise: 'Microsoft',
    },
    {
      isActive: 1,
      clientName: 'Jorge Eduardo De Leon Reyna',
      clientLocation: 'Reynosa',
      clientEnterprise: 'Macrohard',
    },
    {
      isActive: 0,
      clientName: 'Andrea Catalina Fernandez Mena',
      clientLocation: 'La Paz',
      clientEnterprise: 'Meta',
    },
    {
      isActive: 1,
      clientName: 'Andres Fuentes Alanis',
      clientLocation: 'Guadalajara',
      clientEnterprise: 'Google',
    },
    {
      isActive: 0,
      clientName: 'Gerardo Mora Beltrán',
      clientLocation: 'Queretaro',
      clientEnterprise: 'Softek',
    },
    {
      isActive: 0,
      clientName: 'Oscar Alejandro Reyna Mont.',
      clientLocation: 'Guadalajara',
      clientEnterprise: 'Youtube',
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

export default ClientCard