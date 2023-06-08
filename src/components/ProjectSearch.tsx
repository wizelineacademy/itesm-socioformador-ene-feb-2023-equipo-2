import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";

import { projectContext, projectListContext, statusContext } from "@/context/projectsContext";
import { clientContext, clientListContext } from "@/context/clientContext";
import { stringify } from "querystring";

import Menu from "@/components/Menu";
import ProjectCreation from "@/components/ProjectCreation";
import ProjectTable from "@/components/ProjectTable";

import { useUser } from '@auth0/nextjs-auth0/client';
import { getAuth0Id } from "@/utils/getAuth0Id";

const listOfStatus = [
  { value: "Approved", label: "Approved" },
  { value: "Pending", label: "Pending" },
  { value: "Rejected", label: "Rejected" }
];

interface clientSelectionInterface {
  value: string;
  label: string;
  email: string;
  phone: string;
  erased: boolean;
}

interface projectListInterface {
  value: string;
  label: string;
  orderstatus: string;
  orderstartdate: string;
  orderenddate: string;
  idclient: string;
  clientname: string;
  idteam: string;
  teamname: string;
}

// @ts-ignore
const ProjectSearch = ({ clientID }) => {
  let clientIDInt = parseInt(clientID);
  console.log('clientIDInt', clientIDInt)

  const hasMounted = useHasMounted();

  const projectsContext = useContext(projectContext);
  const projectsListContext = useContext(projectListContext);
  const clientsContext = useContext(clientContext);
  const clientsListContext = useContext(clientListContext);
  const statusesContext = useContext(statusContext);

  const [collapse, setCollapse] = useState(false);
  let [client, setClient] = useState<number>();
  const [name, setName] = useState("");
  const [projectList, setProjectList] = useState<projectListInterface[] | null>(null);

  const [orderStatus, setOrderStatus] = useState("");
  const [estatus, setEstatus] = useState("");
  const [listOfClients, setClientsList] = useState([]);
  const [userInfo, setUserInfo] = useState<any>()

  const { user, error: errorAuth0, isLoading } = useUser();

  //console.log("userInfo -> ", userInfo)

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(link + '/getProjectList')
      .then(res => res.json())
      .then(data => {
        setProjectList(data.orders);
        projectsListContext?.setSelectedProjectList(data.orders);
      })
      .catch(error => console.log("Error ", error))

    let id: number = getAuth0Id(user?.sub)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id
      }),
    };

    fetch(link + "/getUserInfoFromDB", requestOptions)
      .then((response) => response.json())
      .then((data) => setUserInfo(data))
      .catch((error) => console.error("Error al guardar ruta de aprendizaje"));
  }, [isLoading])

  useEffect(() => {
  }, [projectsContext?.setCurrentProject(name)]);

  /*useEffect(() => {
  }, [clientsContext?.setCurrentClient(String(clientIDInt))]);*/

  useEffect(() => {
  }, [statusesContext?.setSelectedStatus(orderStatus)]);

  const handleDropdownSelect = (e: any | null) => {
    if (e === null) {
      setOrderStatus("");
    } else {
      setOrderStatus(e.value);
      statusesContext?.setSelectedStatus(e.value);
    }
  }

  const handleChangeSelectProjectName = (e: any | null) => {
    if (e === null) {
      setName("");
    } else {
      setName(e.value);
      projectsContext?.setCurrentProject(e.value);
    }
  };

  useEffect(() => {
    fetch(link + '/get-clients')
      .then(res => res.json())
      .then(data => {
        setClientsList(data.client);
        clientsListContext?.setSelectedClientList(data.client);
      })
      .catch(error => console.log("Error ", error))
  }, [])

  useEffect(() => {
    //@ts-ignore
    if (clientIDInt === NaN || clientIDInt === null) { 
      setClient(0);
      clientsContext?.setCurrentClient(""); 
    }
    else {
      setClient(clientIDInt)
      clientsContext?.setCurrentClient(String(clientIDInt));
    }
  }, [clientIDInt]);

  const handleChangeClientName = (e: any | null) => {
    if (e === null) {
      setClient(0);
      clientsContext?.setCurrentClient("");
    } else {
      setClient(e.value);
      clientsContext?.setCurrentClient(String(e.value));
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>{userInfo?.idposition === 1 &&
      <Container>
        <Row>
          <Col>
            <label className="form-label">Project Name:</label>
            {projectList ? (
              <Select
                onChange={handleChangeSelectProjectName}
                value={projectList.find((obj) => obj.value === name) || ""}
                options={projectList}
                isClearable
                id="project-name-select"
              />
            ) : (
              <div>Loading...</div>
            )}
          </Col>
          <Col>
            <label className="form-label">Client:</label>
            {listOfClients ? (
              <Select
                onChange={handleChangeClientName}
                //@ts-ignore
            //    value={(client === NaN || client === 0) ? client = clientIDInt && listOfClients.find((obj) => obj.value === clientIDInt) && clientsContext?.setCurrentClient(clientIDInt) : listOfClients.find((obj) => obj.value === client)}
         //     value={options.find((obj) => obj.value === erased) || ""}
                value={listOfClients.find((obj) => obj.value === client) || ''}
                options={listOfClients}
                isClearable
                id="client-select"
                placeholder="Select..."
              />
            ) : (
              <div>Loading...</div>
            )}
          </Col>
          <Col>
            <label className="form-label">Order Status:</label>
            <Select
              onChange={handleDropdownSelect}
              value={listOfStatus.find((obj) => obj.valueOf() === orderStatus)}
              options={listOfStatus}
              isClearable
              id="order-status-select"
            />
          </Col>
          <Col>
            <label className="form-label">&nbsp;</label>
            <button
              className="btn btn-primary w-100"
              onClick={() => setCollapse(!collapse)}
              aria-controls="collapseProjectCreation"
              aria-expanded={collapse}
              data-test="add-project-button"
            >
              {collapse ? (
                <>
                  <FaIcons.FaTimes className="mb-1" />
                  &nbsp;&nbsp;Close
                </>
              ) : (
                <>
                  <FaIcons.FaClipboardList className="mb-1" />
                  &nbsp;&nbsp;Add Project
                </>
              )}
            </button>
          </Col>
          <Collapse in={collapse}>
            <div id="collapseProjectCreation" className="my-3">
              <ProjectCreation />
            </div>
          </Collapse>
        </Row>
      </Container>}
    </>
  );
};

export default ProjectSearch;