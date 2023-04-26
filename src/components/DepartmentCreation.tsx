import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";

const DepartmentCreation = () => {
  const [name, setName] = useState("");

  return (
    <>
      <div className="container bg-light border p-4">
        <div className="row">
          <div className="col-md">
            <label htmlFor="name" className="form-label">
              Department name:
            </label>
            <input
              className="form-control"
              type={"text"}
              id="name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="col-md">
            {/* Submit button */}
            <label className="form-label">
              &nbsp;
            </label>
            <button className="btn btn-primary w-100" >
              <FaIcons.FaPlus className="mb-1" />
              &nbsp;&nbsp;Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentCreation;
