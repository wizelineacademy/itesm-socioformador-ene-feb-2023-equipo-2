// TODO:

import React, { Fragment, useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Collapse } from "react-bootstrap";

import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";
import DataTable, { TableColumn} from 'react-data-table-component';
import TextBox from "@/components/TextBox";


const data = {
  "post": {
      "_id": "62cd5b5ef2a39582f96ad514",
      "title": "asdadsad",
      "description": "sdasdasdasda",
      "imageURL": "image 1",
      "creator_id": "62cd5b1bf2a39582f96ad500",
      "createdAt": "2022-07-12T11:30:38.255Z",
      "updatedAt": "2022-07-12T11:30:38.255Z",
      "__v": 0,
      "id": "62cd5b5ef2a39582f96ad514"
  }
}


const projects = () => {
  const hasMounted = useHasMounted();

  // React Hooks for managing component state
  const [collapse, setCollapse] = useState(false);

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

  const columns: TableColumn<EmployeeDataRow>[] = [
      /*{
        cell: (row) => (
          <Fragment>
            <FaIcons.FaRegDotCircle className={`status-icon-size ${row.isActive === 1 ? 'state-active-employee' : 'state-inactive-employee'}`} />
          </Fragment>
        ),
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
            {row.idposition === 2 ? 'admin' : ''}
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
        width: '50px',
      },
    ]

  const clientData = {
    "id": "1",
    "name": 'Andres Fuentes Alanis',
    "email": 'andres@tec.mx',
    "phone": '1234567890',
    "erased": "false"
  }

  const teamEmployeesData = [
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
    }
  ]

  interface EmployeeDataRow {
    id: number;
    name: string;
    idposition: 1 | 2;
    location: string;
    employeeAreaBadge: string;
    employeeArea: string;
  }

  const teamData = {
    "id": "1",
    "name": "Team Awesome"
  }

  const projectData = {
    "id": "1",
    "name": "awesome project",
    "orderstatus": 'pending',
    "orderdesc": 'Our project aims to create an e-commerce platform that allows customers to purchase products online. The platform must be user-friendly and easy to use, ensuring that the customers find the products they are willing to buy in an effortless way. This will be achieved by developing a website that contains a detailed product catalogue, searching options, and an intuitive checkout process.',
    "idclient": "1",
    "idteam": "1",
    "orderstartdate": '2023-05-6',
    "orderenddate": '2023-05-25',
    "erased": "false"
  }

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Menu
        titulo={"Project Overview"}
        descripcion={""}
      />
      
      <Container className="mt-3">
        <Row>
          <div className="container p-4">
            <div className="card-body d-flex flex-column">
              <div className="d-flex flex-row justify-content-between">
                <h3 className="ml-5">{projectData.name}</h3>
                <h6 className="mt-auto">{projectData.orderstartdate} - {projectData.orderenddate}</h6>
              </div>
              <h6 className="ml-5 mt-2">{projectData.orderdesc}</h6>
              <h5 className="ml-5 mt-4">{clientData.name}</h5>
              <h6 className="ml-5">{clientData.email}</h6>
              <h6 className="ml-5">{clientData.phone}</h6>
            </div>
          </div>
          <Col className="d-flex flex-row-reverse">
            <button
              className="btn btn-primary"
              onClick={() => setCollapse(!collapse)}
              aria-controls="collapseProjectCreation"
              aria-expanded={collapse}
            >
              {collapse ? (
                <>
                  <FaIcons.FaTimes className="mb-1" />
                  &nbsp;&nbsp;Close
                </>
              ) : (
                <>
                  <FaIcons.FaClipboardList className="mb-1" />
                  &nbsp;&nbsp;View Requirements
                </>
              )}
            </button>
          </Col>
        </Row>
        <Collapse in={collapse}>
          <div id="collapseProjectCreation" className="my-3">
            Aqui van los requerimientos del proyecto
          </div>
        </Collapse>
        <DataTable
            title={teamData.name}
            columns={columns}
            data={teamEmployeesData}
            customStyles={customStyles}
            highlightOnHover
            pagination
          />
      </Container>
    </>
  );
};

export default projects;
