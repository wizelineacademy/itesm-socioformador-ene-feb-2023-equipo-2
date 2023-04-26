// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState, useContext } from 'react';
import DataTable, { TableColumn} from 'react-data-table-component';
import { departmentContext } from '@/context/departmentContext';

interface tableProps {
  //pageType: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
  departmentName: string;
}

const DepartmentTable = (props: tableProps) => {

  const selectedDepartment = useContext(departmentContext)

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
    id: string;
    skill: string;
  }

  const columns: TableColumn<DataRow>[] = [
      {
        selector: row => row.id,
        width: '50px',
      },
      {
        name: 'Skill',
        selector: row => row.skill,
      },
    ];

  const data = [
    {
      id: '1',
      skill: 'c++',
    },
    {
      id: '2',
      skill: 'c#',
    },
  ]

  return (
    <>
      <div className='container my-4'>
        <DataTable
          title={selectedDepartment?.selectedDepartment?.label}
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

export default DepartmentTable