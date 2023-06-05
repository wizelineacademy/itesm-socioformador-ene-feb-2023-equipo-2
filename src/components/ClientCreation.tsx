import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";

const ClientCreation = () => {
  const hasMounted = useHasMounted();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isClientAdded, setClientAdded] = useState(false);
  const [missingField, setMissingField] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!name || !email || !phone) {
      setMissingField("Please fill in all fields");
      return;
    }

    let link = process.env.NEXT_PUBLIC_API_URL;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      }),
    };
    fetch(link + "/create-client", requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        setClientAdded(true); // Set the flag to indicate client addition
        setMissingField(""); // Clear the missing field message
      })
      .catch((error) => {
        console.error("Error", error);
        setMissingField("An error occurred."); // Display error message
      });
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="container bg-light border p-4">
        <div className="row">
          <p>Please fill out the following fields to create a client:</p>
        </div>
        <div className="row">
          <div className="col-md">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              className="form-control"
              type="name"
              id="name"
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
            />
          </div>
          <div className="col-md">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              required
            />
          </div>
          <div className="col-md">
            <label htmlFor="phone" className="form-label">
              Phone Number:
            </label>
            <input
              className="form-control"
              type="text"
              id="phone"
              onChange={(event) => setPhone(event.target.value)}
              value={phone}
              required
            />
          </div>
          <div className="col-md">
            <label htmlFor="name" className="form-label">
              &nbsp;
            </label>
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              <FaIcons.FaPlus className="mb-1" />
              &nbsp;&nbsp;Add
            </button>
          </div>
        </div>
        {missingField && (
          <div className="row mt-3">
            <p className="text-danger">{missingField}</p>
          </div>
        )}
        {isClientAdded && (
          <div className="row mt-3">
            <p className="text-success">Client added successfully</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientCreation;
