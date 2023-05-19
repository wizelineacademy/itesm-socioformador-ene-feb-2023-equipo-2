import React, { Fragment, useState, useEffect, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Collapse } from "react-bootstrap";

import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";
import Select from "react-select";
import DatePicker from "react-datepicker";
import DataTable, { TableColumn} from 'react-data-table-component';
import TextBox from "@/components/TextBox";
import { projectContext, projectListContext } from '@/context/projectsContext';
import { clientContext, clientListContext } from "@/context/clientContext";

import { useRouter } from 'next/router';

interface projectTeamMembersInterface {
  id: string;
  employeename: string;
  location: string;
  idposition: string;
  departmentname: string;
  teamname: string;
  idproject: string;
}

interface projectListInterface {
  value: number,
  label: string,
  orderstatus: string,
  orderdesc: string,
  idclient: number,
  idteam: number,
  orderstartdate: string,
  orderenddate: string,
  erased: boolean
}

const projectModification = () => {
  const projectsContext = useContext(projectContext);
  const projectsListContext = useContext(projectListContext);
  const clientsContext = useContext(clientContext);
  const clientsListContext = useContext(clientListContext);
  const hasMounted = useHasMounted();

  const router = useRouter();

  const [selectedProjectOverview, setSelectedProjectOverview] = useState<projectListInterface | null>(null);
  const [projectTeamMembers, setProjectTeamMembers] = useState<projectTeamMembersInterface[] | null>(null);
  const [projectDescription, setProjectDescription] = useState<any>([]);

  // React Hooks
  const [clientName, setClientName] = useState("");

  let [client, setClient] = useState<number>();
  let [team, setTeam] = useState<number>();
  let [response, setResponse] = useState("");
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  let [orderStatus, setOrderStatus] = useState("");
  let [projectName, setProjectName] = useState("");
  const [listOfTeams, setTeamsList] = useState([])
  const [listOfClients, setClientsList] = useState([])


  let link = process.env.NEXT_PUBLIC_API_URL;

  const listOfStatus = [
    {value: "Approved", label: "Approved"},
    {value: "Pending", label: "Pending"},
    {value: "Rejected", label: "Rejected"}
  ];

  let projectID = router.query.slug;

  useEffect(() => {
    console.log(projectID);
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id: projectID}),
    };

    fetch(link + "/getCurrentProject?", requestOptions,)
      .then(res => res.json())
      .then(data => {
        setSelectedProjectOverview(data.orders)
        /*console.log(data.orders)
        console.log(selectedProjectOverview?.orderstartdate)
        let test = selectedProjectOverview?.orderstartdate.toString()
        console.log(test)*/
      })
      .catch(error => console.log("Error ", error))
  }, [])

  useEffect(() => {
  }, [projectsContext?.setCurrentProject(projectName)]);

  useEffect(() => {
    fetch(`${link}/get-clients?id=${clientName}`)
      .then(res => res.json())
      .then(data => {
        setClientsList(data.client)
        clientsListContext?.setSelectedClientList(data.client);
      })
      .catch(error => console.log("Error ", error))
  }, [])

  useEffect(() => {
    fetch(link + '/get-teams')
    .then((res) => res.json())
    .then((data) => {
      setTeamsList(data.teams) 
    })
    .catch((error) => console.log("Error", error))
  }, [])

  useEffect(() => {
  }, [clientsContext?.setCurrentClient(clientName)]);

  const handleSendForm = () => {
    let requestOptions;
    
    if (typeof(client) != "number" || typeof(team) != "number" || typeof(orderStatus) != "string") {
      let clientInt, teamInt, statusStrValue;

      if(typeof(client) != "number") {
        let clientStr = JSON.parse(JSON.stringify(client));
        //console.log(clientStr)
        clientInt = clientStr.value;
        //console.log(clientInt)
      } else {
        clientInt = client;
      }

      if(typeof(team) != "number") {
        let teamStr = JSON.parse(JSON.stringify(team));
        //console.log(teamStr)
        teamInt = teamStr.value;
        //console.log(teamInt);
      } else {
        teamInt = team;
      }

      if(typeof(orderStatus) != "string") {
        let statusStr = JSON.parse(JSON.stringify(orderStatus));
        //console.log(statusStr)
        statusStrValue = statusStr.value;
        //console.log(statusStrValue);
      } else {
        statusStrValue = team;
      }

      console.log(projectName);
        requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({aidescription: response, 
                              orderstatus: statusStrValue, 
                              orderstartdate: startDate.toString(),
                              orderenddate: endDate.toString(),
                              idteam: teamInt,
                              idclient: clientInt,
                              name: projectName}),
      };
    } else {
      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({aidescription: response, 
                              orderstatus: orderStatus, 
                              orderstartdate: startDate.toString(),
                              orderenddate: endDate.toString(),
                              idteam: team,
                              idclient: client,
                              name: projectName}),
      };
    }

    setResponse(response);

    fetch(
      "http://localhost:3000/api/saveAIRequirementDocumentation",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) =>
        console.log("Esqueleto de requerimientos guardados exitosamente")
      )
      .catch((error) =>
        console.error("Error al guardar esqueleto de requerimientos")
      );
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

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  return (
    <>
    <Menu
        titulo={"Project Modification"}
        descripcion={""}
      />
      <div className="container bg-light border p-4">
        <div className="mb-4">
          <Select
            onChange={handleFetchClients} // sets the callback function to handle changes in selected option(s)
            value = {client === undefined ||  client === 0 ? client = selectedProjectOverview?.idclient && listOfClients.find((obj) => obj.value === selectedProjectOverview.idclient) : listOfClients.find((obj) => obj.value === client)}
            //value={listOfClients.find((obj) => obj.value === client)} // sets the currently selected option(s). Use when isMulti is specified.
            options={listOfClients} // sets the available options for the Select component
            placeholder={"Select client..."}
            isClearable
          />

          <br></br>
          
          <Select
            onChange={handleFetchTeams} // sets the callback function to handle changes in selected option(s)
            value = {team === undefined ||  team === 0 ? team = listOfTeams.find((obj) => obj.value === selectedProjectOverview?.idteam) && listOfTeams.find((obj) => obj.value === selectedProjectOverview.idteam) : listOfTeams.find((obj) => obj.value === team)}
            //value={listOfTeams.find((obj) => obj.value === team)} // sets the currently selected option(s). Use when isMulti is specified.
            options={listOfTeams} // sets the available options for the Select component
            placeholder={"Select team..."}
            isClearable
          />

          <br></br>

          <div className="container">
            <div className="row">
              {/* Start date calendar */}
              <div className="col-sm">
                <label className="form-label">Order Start Date</label>

                <DatePicker
                  //selected={new Date(JSON.stringify(selectedProjectOverview?.orderstartdate))}
                  selected={new Date()}
                  onChange={(date: Date) => setStartDate(date)}
                />
              </div>

              {/* End date calendar */}
              <div className="col-sm">
                <label className="form-label">Order End Date</label>

                <DatePicker
                  //selected={new Date(JSON.stringify(selectedProjectOverview?.orderenddate))}
                  selected={new Date()}
                  onChange={(date: Date) => setEndDate(date)}
                />
              </div>

              {/* Order status buttons */}
              <div className="col-sm">
              <label className="form-label">Order Status</label>
                <Select
                  //onSelect={(eventKey: any, e) => handleDropdownSelect}
                  onChange={handleDropdownSelect} // sets the callback function to handle changes in selected option(s)
                  value = {orderStatus === "undefined" || orderStatus === "" || orderStatus === null ? orderStatus = selectedProjectOverview?.orderstatus && listOfStatus.find((obj) => obj.value === selectedProjectOverview.orderstatus) : listOfStatus.find((obj) => obj.value === orderStatus)}
                  //value={listOfStatus.find((obj) => obj.valueOf() === orderStatus)} // sets the currently selected option(s). Use when isMulti is specified.
                  options={listOfStatus} // sets the available options for the Select component
                  placeholder={"Select status..."}
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
            value = {projectName === "undefined" || projectName === "" || projectName === null ? projectName = selectedProjectOverview?.label : projectName}
            //value={projectName}
            placeholder={"Select project name..."}
            rows="1"
            required
          />

          <br></br>
          
          {/* Description of the project generated by AI */}
          <label className="form-label">
            AI-generated project description...
          </label>

          <textarea
            rows="15"
            className="form-control"
            id="projectDescription"
            autoComplete="off"
            onChange={(e) => setResponse(e.target.value)}
            value={response === "undefined" || response === null || response === "" ? response = selectedProjectOverview?.orderdesc : response}
            placeholder="This is the response generated byt the AI. Feel free to modify it..."
          />

          {/* Submit button */}
          <button className="btn btn-primary mt-3" onClick={handleSendForm}>
            <FaIcons.FaBrain className="mb-1" />
            &nbsp;&nbsp;Update project
          </button>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default projectModification;