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

  // // TAREA ANDRÉS FUENTES
  useEffect(() => {
    fetch("https://admin.marco.org.mx/api/expos/current")
      .then((res) => res.json())
      .then((data) => setTarea(data[0].images));
  }, []);

  // handleSendForm is a function that is called when the "Hacer Currículum" button is clicked.
  const handleSendForm = () => {
    const messages = [{ role: "user", content: typeProjects }];
    getChatResponse(messages).then((res) => {
      console.log(res);
      setResponse(res);
    });
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

  const handleClick = (texto : any) => {
    const messages = [{ role: "user", content: texto }];
    getChatResponse(messages).then((res) => {
      console.log(res);
      setResponse(res);
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
              <button className="btn btn-primary mt-3" onClick={handleSendForm}>
                <FaIcons.FaLinkedin className="mb-1" />
                &nbsp;&nbsp;Analyse Profile
              </button>
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
