// TODO:
// 2. Permite seleccionar años y meses?
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
import styles from './GenerarPerfil.module.css'

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
  const [yearsExperience, setYearsExperience] = useState<string>();
  const [typeProjects, setTypeProjects] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [learning, setLearning] = useState<string>("");
  const [linkLinkedin, setLinkLinkedin] = useState<string>("");

  const [tarea, setTarea] = useState([]);

  // // TAREA ANDRÉS FUENTES
  useEffect(() => {
    fetch("https://admin.marco.org.mx/api/expos/current")
      .then((res) => res.json())
      .then((data) => setTarea(data[0].images));
  }, []);

  // handleSendForm is a function that is called when the "Hacer Currículum" button is clicked.
  const handleSendForm = () => {
    alert("Wizeline debe pagar las juntadas al Toshi Tiger");
  };

  // handleYearsExperienceChange is a function that sets the years of experience and ensures that only numbers (including decimal points) are allowed as input.
  const handleYearsExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Check if the input value is a valid number
    if (!isNaN(Number(value))) {
      setYearsExperience(value);
    }
  };

  // const handleChangeTechnology = (selectedOptions: ValueType<OptionTypeBase>) works as well but with the error.
  // The above commented out code can be used as an alternative, but it may result in an error.
  // In this implementation, the type of `selectedOptions` is set to `any` to prevent the error.
  const handleChangeTechnology = (selectedOptions: any) => {
    const selectedValues = (selectedOptions as any[]).map(
      (option) => option.value
    ); // allows multiple values to be selected and saved inside the useState hook
    // The same code written differently
    // const selectedValues = (
    //   selectedOptions as Array<{ value: string; label: string }>
    // ).map((option) => option.value);
    setSelectedLanguages(selectedValues);
  };

  console.log(tarea);

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Menu
        titulo={"Completar Perfil"}
        descripcion={
          "Para que la inteligencia artificial pueda generar un perfil completo, necesitamos que nos proporciones tu información laboral y educativa. Puedes hacerlo de varias maneras: mediante tu perfil de LinkedIn, llenando los campos de nuestra aplicación web o subiendo tu currículum a nuestra plataforma."
        }
      />
      <div className="container">
        <div className="mb-4">
          <Tabs
            defaultActiveKey="linkedin"
            id="fill-tab-generar-perfil"
            className="mb-3"
            fill
          >
            <Tab eventKey="linkedin" title="Perfil de LinkedIn">
              <label className="form-label">
                Por favor, proporcione el enlace a su perfil de LinkedIn para
                que podamos llevar a cabo un análisis de su cuenta.
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
              <button className="btn btn-primary mt-3" onClick={handleSendForm}>
                <FaIcons.FaLinkedin className="mb-1" />
                &nbsp;&nbsp;Analizar Perfil
              </button>
            </Tab>
            <Tab eventKey="manual" title="Llenado Manual">
              {/* Experience input field */}
              <label className="form-label">
                ¿Cuántos años de experiencia tienes en desarrollo de software?
                (Se pueden agregar números decimales)
              </label>
              <input
                className="form-control"
                type="text"
                id="yearsExperience"
                autoComplete="off"
                onChange={handleYearsExperienceChange}
                value={yearsExperience}
                required
              />
              {/* Project type input field */}
              <label className="form-label">
                ¿Descríbenos en pocas palabras en qué tipo de proyectos has
                trabajado anteriormente?
              </label>
              <textarea
                className="form-control"
                rows={2}
                id="typeProjects"
                autoComplete="off"
                onChange={(e) => setTypeProjects(e.target.value)}
                value={typeProjects}
                required
              />
              {/* Selected languages input field */}
              <label className="form-label">
                ¿Qué lenguajes de programación y tecnologías estás más
                familiarizado?
              </label>
              <Select
                options={options} // sets the available options for the Select component
                value={options.filter((obj) =>
                  selectedLanguages.includes(obj.value)
                )} // sets the currently selected option(s). Use when isMulti is specified.
                onChange={handleChangeTechnology} // sets the callback function to handle changes in selected option(s)
                isMulti // indicates that multiple options can be selected
                placeholder="Seleccionar tecnologías..."
              />
              {/* <p>{selectedLanguages}</p> */}
              {/* Learning input field */}
              <label className="form-label">
                ¿Cómo te mantienes actualizado con las últimas tecnologías y
                tendencias en desarrollo de software?
              </label>
              <input
                className="form-control"
                type={"text"}
                id="learning"
                autoComplete="off"
                onChange={(e) => setLearning(e.target.value)}
                value={learning}
                required
              />
              {/* Submit button */}
              <button className="btn btn-primary mt-3" onClick={handleSendForm}>
                <FaIcons.FaBrain className="mb-1" />
                &nbsp;&nbsp;Hacer Currículum
              </button>
            </Tab>
            <Tab eventKey="curriculum" title="PDF Currículum">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                  Por favor, proporcione su currículum en formato PDF para poder
                  revisarlo.
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
