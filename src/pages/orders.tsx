// TODO: 

// Component orders.tsx, that decides what to show if the user is an admin or a colaborator.

// The presentation of the order management features has not been decided yet. 
// It could be implemented as a pop-up, another page, or as part of the same page.
// Some of the features that we want to include are:
// - Add button: This button will allow the user to add new orders to the system.
// - Edit button: This button will allow the user to edit existing orders.
// - Delete button: This button will allow the user to delete orders from the system.
// Colaborators will just see the orders they are in, they won´t be able to use this buttons, just see the orders in which they are placed.

// To make it easier for users to find specific orders, we will also include an OrderSearch.tsx component. 
// This component will allow users to search for orders by customer name, order ID, or other criteria.

// We will display a table showing all the orders in the system. 
// This table will include basic information about each order, such as order ID, company, etc.

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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

// 'options' will later be replaced by table skills in database
const listOfClients = [
  { value: "JohnDoeID", label: "John Doe" },
  { value: "AndresFuentesID", label: "Andres Fuentes" },
  { value: "CatalinaFernandezID", label: "Catalina Fernandez" },
];


const orders = () => {const hasMounted = useHasMounted();
  // React Hooks for managing component state
  //const [listOfClients, setClients] = useState<string[]>([]);
  const [client, setClient] = useState<string>("")
  const [projectDescription, setProjectDescription] = useState<string>("");
  //const [typeProjects, setTypeProjects] = useState<string>("");

  const [tarea, setTarea] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSendForm = () => {
    alert("Wizeline debe pagar las juntadas al Toshi Tiger");
  };

  // const handleChangeTechnology = (selectedOptions: ValueType<OptionTypeBase>) works as well but with the error.
  // The above commented out code can be used as an alternative, but it may result in an error.
  // In this implementation, the type of `selectedOptions` is set to `any` to prevent the error.
  const handleChangeClient = (e: any) => {
    setClient(e.value);
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
        titulo={"¡Crear una orden para mi proyecto!"}
        descripcion={
          "¡Gracias por considerar nuestros servicios! Por favor, rellene el siguiente formulario con la información requerida para que podamos entender mejor su proyecto de programación."}
      />
      <div className="container">
        <div className="mb-4">
          <Select
                options={listOfClients} // sets the available options for the Select component
                value={listOfClients.find(obj => obj.value === client)} // sets the currently selected option(s). Use when isMulti is specified.
                onChange={handleChangeClient} // sets the callback function to handle changes in selected option(s)
                placeholder="Seleccionar cliente..."
          />

            {/* Experience input field */}
              <label className="form-label">
                Descripción de la orden
              </label>
              <textarea
                className="form-control"
                id="projectDescription"
                autoComplete="off"
                onChange={(e) => setProjectDescription(e.target.value)}
                value={projectDescription}
                placeholder="Descripción general del proyecto..."
                rows="6"
                required
              />
              {/* Submit button */}
              <button className="btn btn-primary mt-3" onClick={handleSendForm}>
                <FaIcons.FaBrain className="mb-1" />
                &nbsp;&nbsp;Generar descripción profunda
              </button>
              
              <br></br>
              <br></br>
              
               {/* Descripition of the project generated by AI */}
               <label className="form-label">
                Descripción profunda del proyecto
              </label>

              <textarea
                rows = "15"
                className="form-control"
                id="projectDescription"
                autoComplete="off"
                onChange={(e) => setProjectDescription(e.target.value)}
                value={"Descripción generada por la AI: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nRequerimientos funcionales:\n\nRequerimientos no funcionales:\n\nHistorias de usuario:\n\nCriterios de aceptación\n\nCasos de prueba:"}
                required
              />
              
              <br></br>

              <div className = "container">
                <div className = "row">

                  {/* Start date calendar */}
                  <div className = "col-sm">
                    <label className = "form-label">
                    Fecha de inicio de la orden
                    </label> 
                    
                    <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    />
                  </div>

                  {/* End date calendar */}
                  <div className = "col-sm">
                    <label className = "form-label">
                    Fecha de fin de la orden
                    </label> 
                    
                    <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    />
                  </div>

                  {/* Order status buttons */}
                  <div className = "col-sm">
                    <Stack direction="column" spacing={6}>  
                    <label style = {{className: "form-label", textAlign: "center"}}>
                    Estatus de la orden
                    </label>
                      <Button variant="contained" color="success">Orden Aprobada</Button>  
                      <Button variant="contained" color="warning">Orden Pendiente</Button>  
                      <Button variant="contained" color="error">Orden Rechazada</Button>  
                    </Stack>  
                  </div>

                </div>
              </div>
        </div>
      </div>
    </>
  );
}

export default orders