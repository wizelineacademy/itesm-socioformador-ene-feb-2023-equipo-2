import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import Select from "react-select";
import { useHasMounted } from "@/components/useHasMounted";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getChatResponse } from "@/openai/openai";
import { Dropdown, DropdownButton } from "react-bootstrap";

let link = process.env.NEXT_PUBLIC_API_URL;

const ProjectCreation = () => {
  const hasMounted = useHasMounted();
  // React Hooks for managing component state
  const [client, setClient] = useState<number>();
  const [team, setTeam] = useState<number>();
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [response, setResponse] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [orderStatus, setOrderStatus] = useState("");
  const [projectName, setProjectName] = useState("");
  const [listOfTeams, setTeamsList] = useState([])
  const [listOfClients, setClientsList] = useState([])

  const listOfStatus = [
    {value: "Approved", label: "Approved"},
    {value: "Pending", label: "Pending"},
    {value: "Rejected", label: "Rejected"}
  ];

  useEffect(() => {
    fetch(link + '/get-teams')
    .then((res) => res.json())
    .then((data) => {
      setTeamsList(data.teams) 
    })
    .catch((error) => console.log("Error", error))
  }, [])

  useEffect(() => {
    fetch(link + '/get-clients')
    .then((res) => res.json())
    .then((data) => {
      setClientsList(data.client) 
    })
    .catch((error) => console.log("Error", error))
  }, [])

  /*const handleSendForm = () => {
    const messages = [
      {
        role: "user",
        content:
          "In my company we are about to do a project. Its description is the following:" +
          projectDescription +
          'Following the project description above I need you to write a section named “Project description” where you make more descriptive the project’s description I told you, after that I need you to list the functional requirements with its user stories and each of them with their lists of use cases and acceptance criteria; finalize with the non-functional requirements with the same things as the functional ones. I need your response to be a JSON and to be indented properly to improve readability, follow the following example: {"Project description":"Our mission is to design a hospital system that simplifies the process of finding donors for people on the waiting list for transplants. The system will ensure that all necessary information is kept organized and up-to-date in order to reduce wait times and improve success rates.","Functional requirements":[{"ID":"FR001","Name":"Functional requirement name","User stories":[{"ID":"US001","Description":"Functional requirement description"},{"ID":"US002","Description":"Functional requirement description"}],"Use cases":[{"ID":"UC001","Description":"Use case description","Acceptance criteria":[{"ID":"AC001","Description":"Acceptance criteria description"},{"ID":"AC002","Description":"Acceptance criteria description"}]},{"ID":"UC002","Description":"Use case description","Acceptance criteria":[{"ID":"AC001","Description":"All required fields must be completed"},{"ID":"AC002","Description":"Information must be validated before submission"}]}]}],"Non-functional requirements":[{"ID":"NFR001","Name":"Non-functional requirement name","Use cases":[{"ID":"UC005","Description":"Use case description","Acceptance criteria":[{"ID":"AC007","Description":"Acceptance criteria description"},{"ID":"AC008","Description":"Acceptance criteria description"}]}]},{"ID":"NFR002","Name":"Performance","Use cases":[{"ID":"UC006","Description":"Use case description","Acceptance criteria":[{"ID":"AC009","Description":"Acceptance criteria description"},{"ID":"AC010","Description":"Acceptance criteria description"}]}]}]}',
      },
    ];
    getChatResponse(messages).then((res) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({aidescription: res, 
                              orderstatus: orderStatus, 
                              orderstartdate: startDate.toString(),
                              orderenddate: endDate.toString(),
                              idteam: team,
                              idclient: client,
                              name: projectName}),
      };

      setResponse(res);

      fetch(
        //"http://localhost:3000/api/saveAIRequirementDocumentation",
        "http://localhost:3000/api/createProject",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) =>
          console.log("Esqueleto de requerimientos guardados exitosamente")
        )
        .catch((error) =>
          console.error("Error al guardar esqueleto de requerimientos")
        );
    });
  };*/

  const handleSendForm = async (event: any) => {
    event.preventDefault();

    const messages = [
      {
        role: "user",
        content:
          "In my company we are about to do a project. Its description is the following:" +
          projectDescription +
          'Following the project description above I need you to write a section named “Project description” where you make more descriptive the project’s description I told you, after that I need you to list the functional requirements with its user stories and each of them with their lists of use cases and acceptance criteria; finalize with the non-functional requirements with the same things as the functional ones. I need your response to be a JSON and to be indented properly to improve readability, follow the following example: {"Project description":"Our mission is to design a hospital system that simplifies the process of finding donors for people on the waiting list for transplants. The system will ensure that all necessary information is kept organized and up-to-date in order to reduce wait times and improve success rates.","Functional requirements":[{"ID":"FR001","Name":"Functional requirement name","User stories":[{"ID":"US001","Description":"Functional requirement description"},{"ID":"US002","Description":"Functional requirement description"}],"Use cases":[{"ID":"UC001","Description":"Use case description","Acceptance criteria":[{"ID":"AC001","Description":"Acceptance criteria description"},{"ID":"AC002","Description":"Acceptance criteria description"}]},{"ID":"UC002","Description":"Use case description","Acceptance criteria":[{"ID":"AC001","Description":"All required fields must be completed"},{"ID":"AC002","Description":"Information must be validated before submission"}]}]}],"Non-functional requirements":[{"ID":"NFR001","Name":"Non-functional requirement name","Use cases":[{"ID":"UC005","Description":"Use case description","Acceptance criteria":[{"ID":"AC007","Description":"Acceptance criteria description"},{"ID":"AC008","Description":"Acceptance criteria description"}]}]},{"ID":"NFR002","Name":"Performance","Use cases":[{"ID":"UC006","Description":"Use case description","Acceptance criteria":[{"ID":"AC009","Description":"Acceptance criteria description"},{"ID":"AC010","Description":"Acceptance criteria description"}]}]}]}',
      },
    ];
    getChatResponse(messages).then((res) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({aidescription: res, 
                              orderstatus: orderStatus, 
                              orderstartdate: startDate.toString(),
                              orderenddate: endDate.toString(),
                              idteam: team,
                              idclient: client,
                              name: projectName}),
      };

      setResponse(res);

      fetch(
        //"http://localhost:3000/api/saveAIRequirementDocumentation",
        //"http://localhost:3000/api/createProject",
        link + "/createProject", requestOptions,
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) =>{
          alert("Exito");
          console.log("Esqueleto de requerimientos guardados exitosamente");
          //console.log(data);
        })
        .catch((error) => console.error("Error", error)
        );
    });
  };

  const handleFetchTeams = (e: any | null) => {
    e === null ? setTeam(0) : setTeam(parseInt(e.value))
  }

  const handleFetchClients = (e: any | null) => {
    e === null ? setClient(0) : setClient(e.value)
  }

  const handleDropdownSelect = (e: any | null) => {
    e === null ? setOrderStatus("") : setOrderStatus(e.value)
  }

  // const handleChangeTechnology = (selectedOptions: ValueType<OptionTypeBase>) works as well but with the error.
  // The above commented out code can be used as an alternative, but it may result in an error.
  // In this implementation, the type of `selectedOptions` is set to `any` to prevent the error.
  const handleChangeClient = (e: any) => {
    setClient(e.value);
  };

  /*function handleDropdownSelect(eventKey: string, event: React.SyntheticEvent<{}>) {
    switch (eventKey) {
      case "Approved":
        setOrderStatus("Approved");
        break;
      case "Pending":
        setOrderStatus("Pending");
        break;
      case "Rejected":
        setOrderStatus("Rejected");
        break;
      default:
        setOrderStatus("");
        break;
    }
  };*/

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
            onChange={handleFetchClients} // sets the callback function to handle changes in selected option(s)
            // @ts-ignore
            value={listOfClients.find((obj) => obj.value === client)} // sets the currently selected option(s). Use when isMulti is specified.
            options={listOfClients} // sets the available options for the Select component
            placeholder="Select client..."
            isClearable
          />

          <br></br>
          
          <Select
            onChange={handleFetchTeams} // sets the callback function to handle changes in selected option(s)
            // @ts-ignore
            value={listOfTeams.find((obj) => obj.value === team)} // sets the currently selected option(s). Use when isMulti is specified.
            options={listOfTeams} // sets the available options for the Select component
            placeholder="Select team..."
            isClearable
          />

          <br></br>

          <div className="container">
            <div className="row">
              {/* Start date calendar */}
              <div className="col-sm">
                <label className="form-label">Order Start Date</label>

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
              <label className="form-label">Order Status</label>
                <Select
                  //onSelect={(eventKey: any, e) => handleDropdownSelect}
                  onChange={handleDropdownSelect} // sets the callback function to handle changes in selected option(s)
                  value={listOfStatus.find((obj) => obj.valueOf() === orderStatus)} // sets the currently selected option(s). Use when isMulti is specified.
                  options={listOfStatus} // sets the available options for the Select component
                  placeholder="Select..."
                  isClearable/>
              </div>
            </div>

            <br></br>

              {/* Project description input field */}
          <label className="form-label">Project name...</label>
          <textarea
            className="form-control"
            id="projectDescription"
            autoComplete="off"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
            placeholder="Name of the project..."
            rows={1}
            required
          />

          <br></br>

            {/* Project description input field */}
          <label className="form-label">Project description...</label>
          <textarea
            className="form-control"
            id="projectDescription"
            autoComplete="off"
            onChange={(e) => setProjectDescription(e.target.value)}
            value={projectDescription}
            placeholder="General description of the project..."
            rows={6}
            required
          />

          {/* Submit button */}
          <button className="btn btn-primary mt-3" onClick={handleSendForm}>
            <FaIcons.FaBrain className="mb-1" />
            &nbsp;&nbsp;Generate description and save project
          </button>
          
          <br></br>
          <br></br>
          
          {/* Descripition of the project generated by AI */}
          <label className="form-label">
            AI-generated project description...
          </label>

          <textarea
            rows={15}
            className="form-control"
            id="projectDescription"
            autoComplete="off"
            value={response}
            placeholder="AI's response will generate after clicking the Generate button..."
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCreation;