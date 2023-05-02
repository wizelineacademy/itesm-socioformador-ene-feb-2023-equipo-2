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
  const [yearsExperience, setYearsExperience] = useState<string>();
  const [typeProjects, setTypeProjects] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [learning, setLearning] = useState<string>("");
  const [linkLinkedin, setLinkLinkedin] = useState<string>("");
  const [response, setResponse] = useState(null);

  const [tarea, setTarea] = useState([]);

  useEffect(() => {
    fetch("https://admin.marco.org.mx/api/expos/current")
      .then((res) => res.json())
      .then((data) => setTarea(data[0].images));
  }, []);

  const handleSendForm = async () => {
    const auxMessage = `Crea una ruta de aprendizaje con 5 herramientas o tecnologías mostrando el nombre de la herramienta o tecnología, la descripción de la misma, los conocimientos previos necesarios para aprenderla y algún sitio de internet, libro o recurso para aprenderlo tomando en cuenta que es para` + typeProjects + `. Finalmente, dame unicamente y exclusivamente los elementos acomodados en formato json con esta estructura:{“Herramientas”: [{  “nombre” ,“descripcion” ,“conocimientos_previos” “recursos”},{“nombre” ,“descripcion” ,“conocimientos_previos” ,“recursos”},]}`
    const messages = [{ role: "user", content: auxMessage }];
    
    getChatResponse(messages).then((res) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inforoadmap: res})
      };
  
        fetch('http://localhost:3000/api/saveRoadMap', requestOptions)
        .then(response => response.json())
        .then(data => console.log("Ruta de aprendizaje guardada exitosamente"))
        .catch(error => console.error("Error al guardar ruta de aprendizaje"));
      
    });
  };

  const handleSendFormLinkedInput = () => {
    const messages = [
      {
        role: "user",
        content:
          "I need a summerized CV based on the information I will give you, and do not use a codebox. This is the following information:" +
          linkLinkedin +
          'Following the previous information, I need your response to be a JSON and to be indented properly to improve readability, if the location on the experience is missing then do not write "job_location": location, ignore the start time and end time and only write the time duration of the experience on "job_duration": duration" and write it on english, follow the following example: {"name": name, "position": ocupation, "location": location, "Experience": [{"job_title": job title, "job_company": company_name, "job_duration": duration, "job_location": "location"}],"Skills": [skill#1, Skill#2, Skill#3, Skill#4, Skill#5, etc.]}',
      },
    ];

    getChatResponse(messages).then((about) => {
      setResponse(about);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ infoabout: about }),
      };

      fetch('http://localhost:3000/api/saveInfoData', requestOptions)
        .then(response => response.json())
        .then(data => console.log("Ruta de aprendizaje guardada exitosamente"))
        .catch(error => console.error("Error al guardar ruta de aprendizaje"));

    });
  }


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
    console.log(selectedValues);
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
        <div className="mb-4">
          <Tabs
            defaultActiveKey="linkedin"
            id="fill-tab-generar-perfil"
            className="mb-3"
            fill
          >
            <Tab eventKey="linkedin" title="LinkedIn Profile">
              <label className="form-label">
                Please provide the link to your LinkedIn profile for
                so that we can carry out an analysis of your account.
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
              <button className="btn btn-primary mt-3" onClick={handleSendFormLinkedInput}>
                <FaIcons.FaLinkedin className="mb-1" />
                &nbsp;&nbsp;Analyse Profile
              </button>

              <br></br>
              <br></br>

              {/* CV from LinkedIn generated by AI */}
              <label className="form-label">
                AI-generated CV Summary...
              </label>

              <textarea
                rows="15"
                className="form-control"
                id="projectDescription"
                autoComplete="off"
                value={response}
                placeholder="AI's response will generate after clicking the Generate button..."
              />

            </Tab>
            <Tab eventKey="manual" title="Manual Form">
              {/* Experience input field */}
              <label className="form-label">
                How many years of experience do you have in software development?
                (Decimal numbers can be added)
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
                Describe in a few words what kind of projects you have
                worked before?
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
                What programming languages and technologies are you most
                acquainted?
              </label>
              <Select
                options={options} // sets the available options for the Select component
                value={options.filter((obj) =>
                  selectedLanguages.includes(obj.value)
                )} // sets the currently selected option(s). Use when isMulti is specified.
                onChange={handleChangeTechnology} // sets the callback function to handle changes in selected option(s)
                isMulti // indicates that multiple options can be selected
                placeholder="Select technologies..."
              />
              {/* <p>{selectedLanguages}</p> */}
              {/* Learning input field */}
              <label className="form-label">
                How do you keep up to date with the latest technologies and
                trends in software development?
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
                &nbsp;&nbsp;Make Resume
              </button>
              <p>{response}</p>
            </Tab>
            <Tab eventKey="curriculum" title="PDF Resume">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                  Please provide your resume in PDF format in order to
                  review it.
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
