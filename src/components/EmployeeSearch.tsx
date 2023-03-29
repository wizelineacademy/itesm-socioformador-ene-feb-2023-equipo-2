// TODO:
// Cambiar los inputs por select boxes
// https://react-select.com/home

import React from "react";
import * as FaIcons from "react-icons/fa";

const EmployeeSearch = () =>  {

  {/*funtion to filter the list using the data from the inputs*/}
  const handleFilterList = () => {
    alert("se van a buscar los empleados con lo seleccionado");
  };

  return (
    <>
      <div className="container my-5">

        {/*for searching employees by their name*/}
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">
              Buscar por nombre
            </label>

            <input
              className="form-control"
              type="text"
              id="nameSearch"
              autoComplete="off"
              required
            />
          </div>
        </div>

        {/*for searching employees in a more general way, by area of development*/}
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">
              Buscar general:
            </label>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Buscar específica:
            </label>
          </div>
        </div>

        {/*for searching employees in a more specific way, by specific knowledge or skill*/}
        <div className="row">
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              id="generalSearch"
              autoComplete="off"
              required
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              id="specificSearch"
              autoComplete="off"
              required
            />
          </div>

          <div className="col-md-4">
            <button className="btn btn-primary" onClick={handleFilterList}>
              <FaIcons.FaSearch className="mb-1" />
              &nbsp;&nbsp;Hacer Currículum
            </button>
          </div>
        </div>


      </div>
    </>
  );
}

export default EmployeeSearch;
