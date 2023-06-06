import React, { useState } from "react";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";

const SkillsCreation = () => {
  const [skill, setSkill] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let link = process.env.NEXT_PUBLIC_API_URL;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iddepartment: 2,
        skillName: skill,
      }),
    };
    fetch(link + "/createSkill", requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        alert("Exito");
        //console.log(data);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <>
      <Container className="container bg-light border p-4">
        <Row>
          <Col>
            <label htmlFor="department" className="form-label">
              Select department:
            </label>
            <Select placeholder="Departament..." />
          </Col>
          <Col>
            <label htmlFor="department" className="form-label">
              What skill would you like to add?:
            </label>
            <input
              className="form-control"
              type={"text"}
              id="skill"
              autoComplete="off"
              onChange={(e) => setSkill(e.target.value)}
              value={skill}
              required
            />
          </Col>
          <Col>
            {/* Submit button */}
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

export default SkillsCreation;
