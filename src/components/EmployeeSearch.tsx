// TODO:
// Cambiar los inputs por select boxes
import React from "react";
// https://react-select.com/home
import * as FaIcons from "react-icons/fa";

const EmployeeSearch = () =>  {

  const handleFilterList = () => {
    alert("se van a buscar los empleados con lo seleccionado");
  };

  return (
    <>
      <div className="container mt-5 mb-5">

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
