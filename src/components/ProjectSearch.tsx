import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";

const clientOptions = [
  { value: "juan-garcia", label: "Juan García" },
  { value: "ana-gonzalez", label: "Ana González" },
  { value: "jose-martinez", label: "José Martínez" },
  { value: "maria-hernandez", label: "María Hernández" },
  { value: "carlos-perez", label: "Carlos Pérez" },
];

const estatusOptions = [
  {value: 2, label: "Approved"},
  {value: 1, label: "Pending"},
  {value: 0, label: "Rejected"}
];

interface projectListInterface {
  id: number;
  orderstatus: string;
  orderdesc: string;
  idclient: number;
  idteam: number;
  orderstartdate: string;
  orderenddate: string;
  erased: boolean;
  name: string;
}

interface projectListSelectionInterface {
  value: string;
  label: string;
}

const ProjectSearch = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  // React Hooks
  const [projectName, setProjectName] = useState("");
  const [projectNameList, setProjectNameList] = useState<projectListSelectionInterface[]>([]);
  const [clientName, setClientName] = useState("");
  const [estatus, setEstatus] = useState("");

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(link + '/getProjects')
      .then(res => res.json())
      .then(data => {
        setProjectNameList(data.orders)
      })
      .catch(error => console.log("Error ", error))
  }, [])

  const handleChangeSelectProjectName = (e: any | null) => {
    e === null ? setProjectName("") : setProjectName(e.value);
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
            <Select
              onChange={handleChangeSelectProjectName}
              value={projectNameList.find((obj) => obj.value === projectName)}
              options={projectNameList}
              isClearable
            />
          </Col>
          <Col>
            <label className="form-label">Client:</label>
            <Select
              //onChange={handleChangeSelectClientName}
              //value={clientOptions.find((obj) => obj.value === clientName)}
              options={clientOptions}
              isClearable
            />
          </Col>
          <Col>
            <label className="form-label">Estatus:</label>
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
