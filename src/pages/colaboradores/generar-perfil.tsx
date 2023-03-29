// TODO:
// 1. Pasar selectedLanguages a un react-select en vez de texto.
// 2. Permite seleccionar años y meses? 
import React, { useState } from "react";
// import Select, {ValueType} from "react-select";
import * as FaIcons from "react-icons/fa";


const generarPerfil = () => {
  // React Hooks for managing component state
  const [yearsExperience, setYearsExperience] = useState<string>();
  const [typeProjects, setTypeProjects] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string>("");
  const [learning, setLearning] = useState<string>("");

  // handleSendForm is a function that is called when the "Hacer Currículum" button is clicked.
  const handleSendForm = () => {
    alert("Wizeline debe pagar las juntadas al Toshi Tiger");
  };

  // handleYearsExperienceChange is a function that sets the years of experience and does not allow letters to be written on the code, just numbers with decimal points
  const handleYearsExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setYearsExperience(value);
    }
  };

  return (
    <>
      
      <div className="container">
        {/* Experience input field */}
        <label className="form-label">
          ¿Cuántos años de experiencia tienes en desarrollo de software? (Se pueden agregar números decimales)
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
          ¿Descríbenos en pocas palabras en qué tipo de proyectos has trabajado
          anteriormente?
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
          ¿Qué lenguajes de programación y tecnologías estás más familiarizado?
        </label>
        <input
          className="form-control"
          type={"text"}
          id="selectedLanguages"
          autoComplete="off"
          onChange={(e) => setSelectedLanguages(e.target.value)}
          value={selectedLanguages}
          required
        />

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
      </div>
    </>
  );
};

export default generarPerfil;