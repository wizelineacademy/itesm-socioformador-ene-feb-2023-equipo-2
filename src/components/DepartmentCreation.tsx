import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";

const DepartmentCreation = () => {
  const [name, setName] = useState("");

  const handleNewDepartments = async () => {
    let link = process.env.NEXT_PUBLIC_API_URL;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ department: name }),
    };

    fetch(link + "/createDepartment", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const alertContainer = document.createElement("div");
        alertContainer.classList.add("alert-container");
        const customAlert = document.createElement("div");
        customAlert.classList.add("custom-alert");
        customAlert.innerHTML = `
          <h2>Success!</h2>
          <p>Department saved sucessfully</p>
          <button id="ok-button">Ok</button>
        `;
        alertContainer.appendChild(customAlert);
        document.body.appendChild(alertContainer);

        const okButton = document.getElementById("ok-button");
        okButton.addEventListener("click", () => {
          alertContainer.remove();
        });

        alertContainer.style.display = "flex";
      })
      .catch((error) => {
        const alertContainer = document.createElement("div");
        alertContainer.classList.add("alert-container");
        const customAlert = document.createElement("div");
        customAlert.classList.add("custom-alert2");
        customAlert.innerHTML = `
          <h2>Error</h2>
          <p>Error saving department</p>
          <button id="ok-button">Ok</button>
        `;
        alertContainer.appendChild(customAlert);
        document.body.appendChild(alertContainer);

        const okButton = document.getElementById("ok-button");
        okButton.addEventListener("click", () => {
          alertContainer.remove();
        });

        alertContainer.style.display = "flex";
      });
  };

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
            <label className="form-label">&nbsp;</label>
            <button
              className="btn btn-primary w-100"
              onClick={handleNewDepartments}
            >
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
