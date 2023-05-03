import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useHasMounted } from "@/components/useHasMounted";

const options = [
  { value: "juan-garcia", label: "Juan García" },
  { value: "ana-gonzalez", label: "Ana González" },
  { value: "jose-martinez", label: "José Martínez" },
  { value: "maria-hernandez", label: "María Hernández" },
  { value: "carlos-perez", label: "Carlos Pérez" },
];

const TeamSearch = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  // React Hooks
  const [name, setName] = useState("");

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <label className="form-label">Name:</label>
            <input
              className="form-control"
              onChange={(e) => e.target.value}
              value={name}
              type="text"
              id="nameSearch"
              autoComplete="off"
            />
          </Col>
          <Col>
            <label className="form-label">Team Name:</label>
            <Select isClearable isMulti options={options} />
          </Col>
          <Col>
            <label className="form-label">Linked Company:</label>
            <Select isClearable isMulti options={options} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TeamSearch;
