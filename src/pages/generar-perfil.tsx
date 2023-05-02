// TODO:
// 1. En "Manual Form", hacer que lea todas las preguntas y genere una respuesta en un textarea
// 2. Pasar lo del textarea a varios fields
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import Select from "react-select";
import { Tab, Tabs, Form } from "react-bootstrap";
import Image from "next/image";
import Head from "next/head";
// Remeber to use ValueType and OptionTypeBase. It shows error but it works.
// import Select, { ValueType, OptionTypeBase } from 'react-select';
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";
import { getChatResponse } from "@/openai/openai";
import { propTypes } from "react-bootstrap/esm/Image";

// 'options' will later be replaced by table skills in database
const options = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
];

const generarPerfil: React.FC = () => {
  const hasMounted = useHasMounted();
  // React Hooks for managing component state
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [yearsExperience, setYearsExperience] = useState<string>();
  const [typeProjects, setTypeProjects] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [learning, setLearning] = useState<string>("");
  const [linkLinkedin, setLinkLinkedin] = useState<string>("");
  const [responseRoadmap, setResponseRoadmap] = useState(null);

  const [tarea, setTarea] = useState([]);

  useEffect(() => {
    fetch("https://admin.marco.org.mx/api/expos/current")
      .then((res) => res.json())
      .then((data) => setTarea(data[0].images));
  }, []);

  const handleSendFormManual = async () => {
    const auxMessage =
      `Crea una ruta de aprendizaje con 5 herramientas o tecnologías mostrando el nombre de la herramienta o tecnología, la descripción de la misma, los conocimientos previos necesarios para aprenderla y algún sitio de internet, libro o recurso para aprenderlo tomando en cuenta que es para` +
      skills +
      `. Finalmente, dame unicamente y exclusivamente los elementos acomodados en formato json con esta estructura:{“Herramientas”: [{  “nombre” ,“descripcion” ,“conocimientos_previos” “recursos”},{“nombre” ,“descripcion” ,“conocimientos_previos” ,“recursos”},]}`;
    const messages = [{ role: "user", content: auxMessage }];

    getChatResponse(messages).then((res) => {
      setResponseRoadmap(res);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inforoadmap: res }),
      };

      fetch("http://localhost:3000/api/saveRoadMap", requestOptions)
        .then((response) => response.json())
        .then((data) =>
          console.log("Ruta de aprendizaje guardada exitosamente")
        )
        .catch((error) =>
          console.error("Error al guardar ruta de aprendizaje")
        );
    });
  };

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Menu
        titulo={"Complete Profile"}
        descripcion={
          "In order for artificial intelligence to generate a complete profile, we need you to provide us with your employment and educational information. You can do it in several ways: through your LinkedIn profile, by filling in the fields of our web application or by uploading your resume to our platform."
        }
      />
      <div className="container">
        <div className="row">
          <div className="col-md">
            <label className="form-label">Name:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e: any) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="col-md">
            <label className="form-label">Position:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e: any) => setName(e.target.value)}
              value={name}
              disabled
            />
          </div>
          <div className="col-md">
            <label className="form-label">Location:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e: any) => setLocation(e.target.value)}
              value={location}
            />
          </div>
        </div>

        <div className="mt-4 mb-4">
          <Tabs
            defaultActiveKey="linkedin"
            id="fill-tab-generar-perfil"
            className="mb-3"
            fill
          >
            <Tab eventKey="linkedin" title="LinkedIn Profile">
              <label className="form-label">
                Please provide the link to your LinkedIn profile for so that we
                can carry out an analysis of your account.
              </label>
              <input
                className="form-control"
                type="text"
                id="linkLinkedin"
                autoComplete="off"
                onChange={(e) => setLinkLinkedin(e.target.value)}
                value={linkLinkedin}
              />
              {/* Submit button */}
              <button className="btn btn-primary mt-3" onClick={handleSendFormManual}>
                <FaIcons.FaLinkedin className="mb-1" />
                &nbsp;&nbsp;Analyse Profile
              </button>
            </Tab>
            <Tab eventKey="manual" title="Manual Form">
              <label className="form-label">
                Please write about your job experience, specifying your
                position, the company, and how long you worked there.
              </label>
              <textarea
                className="form-control"
                onChange={(e: any) => setJobExperience(e.target.value)}
                value={jobExperience}
              />
              <label className="form-label">
                Please write about your skills:
              </label>
              <textarea
                className="form-control"
                onChange={(e: any) => setSkills(e.target.value)}
                value={skills}
              />
              <button className="btn btn-primary mt-3" onClick={handleSendFormManual}>
                <FaIcons.FaBrain className="mb-1" />
                &nbsp;&nbsp;Make Resume
              </button>
              <p>{responseRoadmap}</p>
            </Tab>
            <Tab eventKey="curriculum" title="PDF Resume">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                  Please provide your resume in PDF format in order to review
                  it.
                </Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default generarPerfil;
