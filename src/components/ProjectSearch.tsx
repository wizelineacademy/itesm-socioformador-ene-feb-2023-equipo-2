import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";

import { projectContext, projectListContext } from '@/context/projectsContext';
import { clientContext, clientListContext } from "@/context/clientContext";

const estatusOptions = [
  {value: 2, label: "Approved"},
  {value: 1, label: "Pending"},
  {value: 0, label: "Rejected"}
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

const ProjectSearch = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const projectsContext = useContext(projectContext);
  const projectsListContext = useContext(projectListContext);
  const clientsContext = useContext(clientContext);
  const clientsListContext = useContext(clientListContext);

  // React Hooks
  const [name, setName] = useState("");
  const [projectList, setProjectList] = useState<projectListInterface[] | null>(null);
  
  const [clientName, setClientName] = useState("");
  const [clientList, setClientList] = useState<clientSelectionInterface[] | null>(null);

  const [estatus, setEstatus] = useState("");
  const [listOfClients, setClientsList] = useState([])

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    //fetch(link + '/getProjectList')
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

  const handleChangeSelectProjectName = (e: any | null) => {
    if (e === null) {
      setName("");
    } else {
      setName(e.value);
      projectsContext?.setCurrentProject(e.value);
    }
  };

  useEffect(() => {
    fetch(`${link}/get-clients?id=${clientName}`)
      .then(res => res.json())
      .then(data => {
        setClientList(data.client)
        clientsListContext?.setSelectedClientList(data.client);
      })
      .catch(error => console.log("Error ", error))
  }, [])

  useEffect(() => {
  }, [clientsContext?.setCurrentClient(clientName)]);

  const handleChangeClienttName = (e : any | null) => {
    if (e === null) {
      setClientName("");
    } else {
      setClientName(e.value);
      clientsContext?.setCurrentClient(e.value);
    }
  };

  const handleSearch = (e : any) => {
    alert("buscando")
  }

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
            {clientList ? (
              <Select
                onChange={handleChangeClienttName}
                value={clientList.find((obj) => obj.value === clientName) || ""}
                options={clientList}
                isClearable
              />
            ) : (
              <div>Loading...</div>
            )}
          </Col>
          <Col>
            <label className="form-label">Order Status:</label>
            <Select
              //onChange={handleChangeSelectEstatus}
              //value={estatusOptions.find((obj) => obj.value === estatus)}
              options={estatusOptions}
              isClearable
            />
          </Col>
          <Col>
            <label className="form-label">&nbsp;</label>
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              <FaIcons.FaSearch className="mb-1" />
              &nbsp;&nbsp;Search
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProjectSearch;
