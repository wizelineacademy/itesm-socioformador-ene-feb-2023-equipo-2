// TODO:

import React, { Fragment, useState, useEffect, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Collapse } from "react-bootstrap";

import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";
import DataTable, { TableColumn} from 'react-data-table-component';
import TextBox from "@/components/TextBox";

import { useRouter } from 'next/router';

interface projectOverviewInterface {
  id: string;
  ordername: string;
  orderstatus: string;
  clientname: string;
  email: string;
  phone: string;
  teamname: string;
  orderstartdate: string; 
  orderenddate: string;  
  orderdesc: string;
}

interface projectTeamMembersInterface {
  id: string;
  employeename: string;
  location: string;
  idposition: string;
  departmentname: string;
  teamname: string;
  idproject: string;
}

const projects = () => {
  const hasMounted = useHasMounted();

  const router = useRouter();
  const [selectedProjectOverview, setSelectedProjectOverview] = useState<projectOverviewInterface[] | null>(null);
  const [projectTeamMembers, setProjectTeamMembers] = useState<projectTeamMembersInterface[] | null>(null);
  const [projectDescription, setProjectDescription] = useState<any>([]);

  let projectID = router.query.slug;

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(link + '/getProjectOverview')
      .then(res => res.json())
      .then(data => {
        setSelectedProjectOverview(data.orders)
      })
      .catch(error => console.log("Error ", error))
  }, [])

  const projectOverviewData = selectedProjectOverview?.map((project) => {
    return {
      id: project.id,
      ordername: project.ordername,
      orderstatus: project.orderstatus,
      clientname: project.clientname,
      email: project.email,
      phone: project.phone,
      teamname: project.teamname,
      orderstartdate: project.orderstartdate,
      orderenddate: project.orderenddate,
      orderdesc: project.orderdesc,
    }
  })

  let filteredProjectOverviewData = projectID ? projectOverviewData?.filter(project => project.id === projectID) : projectOverviewData;

  useEffect(() => {
    fetch(link + '/getTeamEmployees')
      .then(res => res.json())
      .then(data => {
        setProjectTeamMembers(data.teamMembers)
      })
      .catch(error => console.log("Error ", error))
  }, [])

  const projectTeamMembersData = projectTeamMembers?.map((members) => {
    return {
      id: members.id,
      employeename: members.employeename,
      location: members.location,
      idposition: members.idposition,
      departmentname: members.departmentname,
      teamname: members.teamname,
      idproject: members.idproject,
    }
  })

  let filteredProjectTeamMembersData = projectID ? projectTeamMembersData?.filter(members => members.idproject === projectID) : projectTeamMembersData;
  console.log(projectTeamMembersData);

  /*const description = filteredProjectOverviewData?.[0]?.orderdesc;
  if (description) {
    let filteredDescription = getParsedJson(description);
    let finalJson = JSON.parse(filteredDescription);
    setProjectDescription(finalJson);
    console.log(finalJson);
  }*/
  /*else {
    setProjectDescription
  }*/
  //console.log(filteredProjectOverviewData);

  // React Hooks for managing component state
  const [collapse, setCollapse] = useState(false);

  const handleEmployeeSeeInfo = () => {
    alert("se va a redireccionar al perfil del usuario");
  };

  const handleEmployeeDelete = () => {
    alert("se va a eliminar el usuario del sistema");
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

  const columns: TableColumn<projectTeamMembersInterface>[] = [
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
        selector: row => row.id,
        sortable: true,
      },
      {
        name: 'Name',
        selector: row => row.employeename,
        sortable: true,
      },
      {
        name: 'Location',
        selector: row => row.location,
      },
      {
        cell: (row) => (
          <Fragment>
            {row.idposition === '2' ? 'admin' : ''}
          </Fragment>
        ),
      },
      {
        cell: (row) => (
          <Fragment>
              <TextBox textBoxText={row.departmentname} textBoxColorScheme={'backend'} />
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
    ]

  interface EmployeeDataRow {
    id: number;
    name: string;
    idposition: 1 | 2;
    location: string;
    employeeAreaBadge: string;
    employeeArea: string;
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
                <h3 className="ml-5">{filteredProjectOverviewData?.[0]?.ordername}</h3>
                <h6 className="mt-auto">{filteredProjectOverviewData?.[0]?.orderstartdate} - {filteredProjectOverviewData?.[0]?.orderenddate}</h6>
              </div>
              <h6 className="ml-5 mt-2">{filteredProjectOverviewData?.[0]?.orderdesc}</h6>
              <h5 className="ml-5 mt-4">{filteredProjectOverviewData?.[0]?.clientname}</h5>
              <h6 className="ml-5">{filteredProjectOverviewData?.[0]?.email}</h6>
              <h6 className="ml-5">{filteredProjectOverviewData?.[0]?.phone}</h6>
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
            {filteredProjectOverviewData?.[0]?.orderdesc}
          </div>
        </Collapse>
        <DataTable
            title={'Team Members'}
            columns={columns}
            // @ts-ignore
            data={filteredProjectTeamMembersData}
            customStyles={customStyles}
            highlightOnHover
            pagination
          />
      </Container>
    </>
  );
};

export default projects;
