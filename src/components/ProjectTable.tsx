// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState } from 'react';
import DataTable, { TableColumn} from 'react-data-table-component';


const ProjectTable = () => {

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
    projectName: string;
    clientName: string;
    clientCompany: string;
    teamName: string;
    startDate: string;
    endDate: string;
  }

  const columns: TableColumn<DataRow>[] = [
      {
        name: 'Project',
        selector: row => row.projectName,
        sortable: true,
      },
      {
        name: 'Client',
        selector: row => row.clientName,
      },
      {
        name: 'Company',
        selector: row => row.clientCompany,
      },
      {
        name: 'Team',
        selector: row => row.teamName,
      },
      {
        name: 'Start Date',
        selector: (row) => row.startDate,
      },
      {
        name: 'End Date',
        selector: (row) => row.endDate,
        //selector: row => row.endDate.getDate() + '/' + row.endDate.getMonth() + '/' + row.endDate.getFullYear(),
      },
    ];

  const data = [
    {
      projectName: 'project name',
      clientName: 'client name',
      clientCompany: 'company 1',
      teamName: 'team 1',
      startDate: '2019-01-16',
      endDate: '2019-01-16',
    },
    {
      projectName: 'project name',
      clientName: 'client name',
      clientCompany: 'company 1',
      teamName: 'team 1',
      startDate: '2019-01-16',
      endDate: '2019-01-16',
    },
    {
      projectName: 'project name',
      clientName: 'client name',
      clientCompany: 'company 1',
      teamName: 'team 1',
      startDate: '2019-01-16',
      endDate: '2019-01-16',
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

export default ProjectTable