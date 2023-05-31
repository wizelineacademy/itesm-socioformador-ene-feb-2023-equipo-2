import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Collapse  } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";

import { projectContext, projectListContext, statusContext } from '@/context/projectsContext';
import { clientContext, clientListContext } from "@/context/clientContext";
import { stringify } from "querystring";

import Menu from "@/components/Menu";
import ProjectCreation from "@/components/ProjectCreation";
import ProjectTable from "@/components/ProjectTable";
import { useRouter } from 'next/router';



const listOfStatus = [
  {value: "Approved", label: "Approved"},
  {value: "Pending", label: "Pending"},
  {value: "Rejected", label: "Rejected"}
];

interface clientSelectionInterface {
  value: string,
  label: string,
  email: string,
  phone: string,
  erased: boolean
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

const ProjectSearch = (clientID: string | string[] | undefined) => {
  // @ts-ignore
  let clientIDStr = stringify(clientID);
  clientIDStr = clientIDStr.replace('clientID=', '');
  let clientIDInt = parseInt(clientIDStr);
  //console.log(clientIDInt)

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const projectsContext = useContext(projectContext);
  const projectsListContext = useContext(projectListContext);
  const clientsContext = useContext(clientContext);
  const clientsListContext = useContext(clientListContext);
  const statusesContext = useContext(statusContext);
  //const clientsListContext = useContext(clientListContext);

  // React Hooks for managing component state
  const [collapse, setCollapse] = useState(false);
  // React Hooks
  let [client, setClient] = useState<number>();
  const [name, setName] = useState("");
  const [projectList, setProjectList] = useState<projectListInterface[] | null>(null);
  
  const [orderStatus, setOrderStatus] = useState("");
  //const [clientList, setClientList] = useState<clientSelectionInterface[] | null>(null);

  const [estatus, setEstatus] = useState("");
  const [listOfClients, setClientsList] = useState([])

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(link + '/getProjectList')
      .then(res => res.json())
      .then(data => {
        setProjectList(data.orders)
        projectsListContext?.setSelectedProjectList(data.orders);
      })
      .catch(error => console.log("Error ", error))
  }, [])

  useEffect(() => {
  }, [projectsContext?.setCurrentProject(name)]);

  useEffect(() => {
    clientsContext?.setCurrentClient(String(client))
    //console.log(clientsContext?.currentClient)
  }, [client]);

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
    fetch(`${link}/get-clients?id=${client}`)
      .then(res => res.json())
      .then(data => {
        setClientsList(data.client)
        clientsListContext?.setSelectedClientList(data.client);
      })
      .catch(error => console.log("Error ", error))
  }, [])

  useEffect(() => {
  }, [clientsContext?.setCurrentClient(String(client))]);

  const handleChangeClientName = (e : any | null) => {
    if (e === null) {
      setClient(0);
      clientsContext?.setCurrentClient("")
    } else {
      setClient(e.value);
      clientsContext?.setCurrentClient(String(e.value));
    }
  };

  // const handleSearch = (e : any) => {
  //   alert("buscando")
  // }

  if (!hasMounted) {
    return null;
  }

  return (
    <>
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
                //value={clientList.find((obj) => obj.value === clientName) || ""} clientID
                // @ts-ignore
                value = {(client === undefined ||  client === 0) ? client = clientIDInt && listOfClients.find((obj) => obj.value === clientIDInt) && clientsContext?.setCurrentClient(clientIDInt): listOfClients.find((obj) => obj.value === client)}
                options={listOfClients}
                isClearable
                placeholder = {"Select..."}
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
            />
          </Col>
          <Col>
                <label className="form-label">&nbsp;</label>
                   <button
                    className="btn btn-primary w-100"
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
          
             {/* <button className="btn btn-primary w-100" onClick={handleSearch}>
              <FaIcons.FaSearch className="mb-1" />
              &nbsp;&nbsp;Search
            </button>  */}
          
        </Row>
      </Container>
    </>
  );
};

export default ProjectSearch;
