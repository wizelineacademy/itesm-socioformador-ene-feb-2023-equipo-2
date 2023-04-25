import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import Select from "react-select";
import { useHasMounted } from "@/components/useHasMounted";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { getChatResponse } from "@/openai/openai";

// 'options' will later be replaced by table skills in database
const listOfClients = [
  { value: "JohnDoeID", label: "John Doe" },
  { value: "AndresFuentesID", label: "Andres Fuentes" },
  { value: "CatalinaFernandezID", label: "Catalina Fernandez" },
];

const ProjectCreation = () => {
  const hasMounted = useHasMounted();
  // React Hooks for managing component state
  const [client, setClient] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [response, setResponse] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSendForm = () => {
    const messages = [{ role: "user", content: "In my company we are about to do a project. Its description is the following:" + projectDescription + "Following the project description above I need you to write a section named \“Project description\” where you optimize the project\’s description I told you, after that I need you to list the functional requirements with its user stories and each of them with their lists of use cases and acceptance criteria; finalize with the non-functional requirements with the same things as the functional ones. I need your response to be a JSON and to be indented properly to improve readability, follow the following example: {\"Project description\":\"Our mission is to design a hospital system that simplifies the process of finding donors for people on the waiting list for transplants. The system will ensure that all necessary information is kept organized and up-to-date in order to reduce wait times and improve success rates.\",\"Functional requirements\":[{\"ID\":\"FR001\",\"Name\":\"Functional requirement name\",\"User stories\":[{\"ID\":\"US001\",\"Description\":\"Functional requirement description\"},{\"ID\":\"US002\",\"Description\":\"Functional requirement description\"}],\"Use cases\":[{\"ID\":\"UC001\",\"Description\":\"Use case description\",\"Acceptance criteria\":[{\"ID\":\"AC001\",\"Description\":\"Acceptance criteria description\"},{\"ID\":\"AC002\",\"Description\":\"Acceptance criteria description\"}]},{\"ID\":\"UC002\",\"Description\":\"Use case description\",\"Acceptance criteria\":[{\"ID\":\"AC001\",\"Description\":\"All required fields must be completed\"},{\"ID\":\"AC002\",\"Description\":\"Information must be validated before submission\"}]}]}],\"Non-functional requirements\":[{\"ID\":\"NFR001\",\"Name\":\"Non-functional requirement name\",\"Use cases\":[{\"ID\":\"UC005\",\"Description\":\"Use case description\",\"Acceptance criteria\":[{\"ID\":\"AC007\",\"Description\":\"Acceptance criteria description\"},{\"ID\":\"AC008\",\"Description\":\"Acceptance criteria description\"}]}]},{\"ID\":\"NFR002\",\"Name\":\"Performance\",\"Use cases\":[{\"ID\":\"UC006\",\"Description\":\"Use case description\",\"Acceptance criteria\":[{\"ID\":\"AC009\",\"Description\":\"Acceptance criteria description\"},{\"ID\":\"AC010\",\"Description\":\"Acceptance criteria description\"}]}]}]}"}];
    getChatResponse(messages).then((res) => {
      console.log(res);
      setResponse(res);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aidescription: res})
    };

    fetch('http://localhost:3000/api/saveAIRequirementDocumentation', requestOptions)
    .then(response => response.json())
    .then(data => console.log("Esqueleto de requerimientos guardados exitosamente"))
    .catch(error => console.error("Error al guardar esqueleto de requerimientos"));
    });
  };


  // const handleChangeTechnology = (selectedOptions: ValueType<OptionTypeBase>) works as well but with the error.
  // The above commented out code can be used as an alternative, but it may result in an error.
  // In this implementation, the type of `selectedOptions` is set to `any` to prevent the error.
  const handleChangeClient = (e: any) => {
    setClient(e.value);
  };

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="container bg-light border p-4">
        <div className="mb-4">
          <Select
            options={listOfClients} // sets the available options for the Select component
            value={listOfClients.find((obj) => obj.value === client)} // sets the currently selected option(s). Use when isMulti is specified.
            onChange={handleChangeClient} // sets the callback function to handle changes in selected option(s)
            placeholder="Select client..."
          />

          {/* Experience input field */}
          <label className="form-label">Project description...</label>
          <textarea
            className="form-control"
            id="projectDescription"
            autoComplete="off"
            onChange={(e) => setProjectDescription(e.target.value)}
            value={projectDescription}
            placeholder="General description of the project..."
            rows="6"
            required
          />
          {/* Submit button */}
          <button className="btn btn-primary mt-3" onClick={handleSendForm}>
            <FaIcons.FaBrain className="mb-1" />
            &nbsp;&nbsp;Generate
          </button>

          <br></br>
          <br></br>

          {/* Descripition of the project generated by AI */}
          <label className="form-label">
            AI-generated project description...
          </label>

          <textarea
            rows="15"
            className="form-control"
            id="projectDescription"
            autoComplete="off"
            value={response}
            placeholder="AI's response will generate after clicking the Generate button..."
          />

          <br></br>

          <div className="container">
            <div className="row">
              {/* Start date calendar */}
              <div className="col-sm">
                <label className="form-label">
                  Order Start Date
                </label>

                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                />
              </div>

              {/* End date calendar */}
              <div className="col-sm">
                <label className="form-label">Order End Date</label>

                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                />
              </div>

              {/* Order status buttons */}
              <div className="col-sm">
                <Stack direction="column" spacing={6}>
                  <label
                    style={{ className: "form-label", textAlign: "center" }}
                  >
                    Order Status
                  </label>

                  <Button variant="contained" color="success">
                    Approved
                  </Button>
                  <Button variant="contained" color="warning">
                    Pending
                  </Button>
                  <Button variant="contained" color="error">
                    Rejected
                  </Button>

                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCreation;
