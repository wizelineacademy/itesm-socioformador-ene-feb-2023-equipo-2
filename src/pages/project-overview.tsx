// TODO:

import React, { Fragment, useState, useEffect, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";
import DataTable, { TableColumn } from "react-data-table-component";
import TextBox from "@/components/TextBox";
import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0/client';


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
  email: string;
  linkedinlink: string;
  idteam: string;
  teamname: string;
  idproject: string;
}

const projects = () => {
  const hasMounted = useHasMounted();

  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    // Redirect logic here
    if (isLoading) {
      undefined
    } else {
      if (!user) {
        router.push("/");
      }
    }
  }, [isLoading]);

  const [selectedProjectOverview, setSelectedProjectOverview] = useState<projectOverviewInterface[]>();
  const [projectTeamMembers, setProjectTeamMembers] = useState<projectTeamMembersInterface[]>();
  const [projectDescription, setProjectDescription] = useState("");

  let projectID = router.query.slug;

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(link + "/getProjectOverview")
      .then((res) => res.json())
      .then((data) => {
        //console.log("orders");
        setSelectedProjectOverview(data.orders);
        // setProjectDescription(data.orders[0].orderdesc)
      })
      .catch((error) => console.log("Error ", error));
  }, []);

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
    };
  });

  let filteredProjectOverviewData = projectID
    ? projectOverviewData?.filter((project) => project.id === projectID)
    : projectOverviewData;

  function extractProjectDescription(text: string | undefined) {
    if (!text) return "";
    const parsedText = JSON.parse(text);

    // Find the index of "Functional requirements"
    const endIndex = parsedText.indexOf("Functional requirements");

    // Extract the project description
    const projectDescription = parsedText.substring(0, endIndex);

    // Replace '\n' escape sequences with '<br>' tags
    let replacedDescription = projectDescription
      .replace(/\n/g, "<br>")
      .replace(/"Project description":/g, "")
      .replace(/"|{|}|,/g, "")
      .replace(/"|{|}|\,/g, "")
      .trim();


    return replacedDescription;
  }

  function replaceWithBrFR(text: string | undefined) {
    if (!text) return "";
    const parsedText = JSON.parse(text);

    // Extract everything after "Functional requirements"
    const startIndex = parsedText.indexOf("Functional requirements");
    const extractedText = parsedText.substring(startIndex);

    // Remove characters and add formatting
    const replacedText = extractedText
      .replace(/[\[\]{}"]/g, "")
      .replace(/\n/g, " ")
      .replace(
        /Functional requirements/g,
        "<strong>Functional requirements</strong> "
      )
      .replace(
        /Non-functional requirements/g,
        "<strong><br><br>Non-functional requirements</strong> "
      )
      .replace(/Name:\s+/g, "<br><em>&nbsp;&nbsp;&nbsp;&nbsp;Name:</em> ")
      .replace(
        /User stories:\s+/g,
        "<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<u>User stories:</u> "
      )
      .replace(
        /Use cases:\s+/g,
        "<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<u>Use cases:</u> "
      )
      .replace(
        /Acceptance criteria:\s+/g,
        "<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<u>Acceptance criteria:</u> "
      )
      .replace(/ID:\s+/g, "<br><em>&nbsp;&nbsp;&nbsp;&nbsp;ID:</em> ")
      .replace(
        /Description:\s+/g,
        "<br><em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description:</em> "
      )
      .trim();
    return replacedText;
  }

  const descripcion = filteredProjectOverviewData?.[0].orderdesc;

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
        minHeight: "50px",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#EDEDED",
        borderBottomColor: "#FFFFFF",
        borderRadius: "10px",
        outline: "1px solid #FFFFFF",
      },
    },
  };

  const columns: TableColumn<projectTeamMembersInterface>[] = [
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaCircle style={{ color: "black", fontSize: "50px" }} />
        </Fragment>
      ),
      width: "50px",
    },
    {
      name: "Name",
      selector: (row) => row.employeename,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
    },
    {
      cell: (row) => (
        <Fragment>{row.idposition === "1" ? "admin" : ""}</Fragment>
      ),
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Linkedin",
      selector: (row) => row.linkedinlink,
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaInfoCircle
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleEmployeeSeeInfo()}
          />
        </Fragment>
      ),
      width: "50px",
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaTrash
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => handleEmployeeDelete()}
          />
        </Fragment>
      ),
      width: "50px",
    },
  ];

  const missingEmployees = [
    {
      id: '',
      employeename: 'No team members',
      location: '',
      idposition: '',
      email: '',
      linkedinlink: '',
      idteam: '',
      teamname: '',
      idproject: '',
    },
  ]

  useEffect(() => {
    fetch(link + "/getTeamEmployees")
      .then((res) => res.json())
      .then((data) => {
        setProjectTeamMembers(data.teamEmployees);
      })
      .catch((error) => console.log("Error ", error));
  }, []);

  const projectTeamMembersData = projectTeamMembers?.map((members) => {
    console.log('members.idproject', members.idproject)
    return {
      id: members.id,
      employeename: members.employeename,
      location: members.location,
      idposition: members.idposition,
      email: members.email,
      linkedinlink: members.linkedinlink,
      idteam: members.idteam,
      teamname: members.teamname,
      idproject: members.idproject,
    };
  });

  let filteredProjectTeamMembersData = projectID ? projectTeamMembersData?.filter((members) => members.idproject === projectID) : projectTeamMembersData;

  if (!filteredProjectTeamMembersData) {
    filteredProjectTeamMembersData = missingEmployees;
  }

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  return (
    user === undefined ? <div>
      <h1>Loading...</h1>
    </div>
      :
      <>
        <Menu titulo={"Project Overview"} descripcion={""} />
        <Container className="mt-3">
          <Row>
            <div className="container p-4">
              <div className="row">
                <div className="col-2">
                  <h5>
                    Name
                  </h5>
                </div>
                <div className="col-10">
                  {filteredProjectOverviewData?.[0]?.ordername}
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <h5>
                    Dates
                  </h5>
                </div>
                <div className="col-10">
                  {filteredProjectOverviewData?.[0]?.orderstartdate} - {" "}
                  {filteredProjectOverviewData?.[0]?.orderenddate}
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <h5>
                    Description
                  </h5>
                </div>
                <div className="col-10">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: extractProjectDescription(descripcion),
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <h5>
                    Client Name
                  </h5>
                </div>
                <div className="col-10">
                  {filteredProjectOverviewData?.[0]?.clientname}
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <h5>
                    Client Email
                  </h5>
                </div>
                <div className="col-10">
                  {filteredProjectOverviewData?.[0]?.email}
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <h5>
                    Client Phone
                  </h5>
                </div>
                <div className="col-10">
                  {filteredProjectOverviewData?.[0]?.phone}
                </div>
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
              <p

              />
              <div className="card">
                <div
                  className="card-body"
                  dangerouslySetInnerHTML={{ __html: replaceWithBrFR(descripcion) }}
                />
              </div>
            </div>
          </Collapse>
          <DataTable
            title={"Team Members"}
            columns={columns}
            // @ts-ignore
            data={filteredProjectTeamMembersData}
            customStyles={customStyles}
            highlightOnHover
            pagination
            noDataComponent={"No team members"}
          />
        </Container>
      </>
  );
};

export default projects;
