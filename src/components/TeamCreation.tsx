import React, { useState } from "react";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { useHasMounted } from "@/components/useHasMounted";

const options = [
  { value: "monterrey", label: "Monterrey" },
  { value: "saltillo", label: "Saltillo" },
  { value: "reynosa", label: "Reynosa" },
  { value: "victoria", label: "Ciudad Victoria" },
  { value: "lapaz", label: "La Paz" },
  { value: "guadalajara", label: "Guadalajara" },
  { value: "queretaro", label: "Queretaro" },
];

const TeamCreation = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [name, setName] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert("prueba");
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Container className="bg-light border p-4">
        <Row>
          <Col>
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              className="form-control"
              type="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </Col>
          <Col>
            <label htmlFor="programmers" className="form-label">
              Programmers:
            </label>
            <Select options={options} isMulti isClearable />
          </Col>
          <Col>
            <label className="form-label">
              &nbsp;
            </label>
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              <FaIcons.FaPlus className="mb-1" />
              &nbsp;&nbsp;Add
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TeamCreation;
