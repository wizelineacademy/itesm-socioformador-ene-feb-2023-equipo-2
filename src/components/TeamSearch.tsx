import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import { useHasMounted } from "@/components/useHasMounted";

const options = [
  { value: "juan-garcia", label: "Juan García" },
  { value: "ana-gonzalez", label: "Ana González" },
  { value: "jose-martinez", label: "José Martínez" },
  { value: "maria-hernandez", label: "María Hernández" },
  { value: "carlos-perez", label: "Carlos Pérez" },
];

const TeamSearch = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [name, setName] = useState("");

  const options = [
    { value: "1", label: "one" },
    { value: "2", label: "two" },
  ];

  const handleChangeSelect = (e : any | null) => {
    if (e === null) {
      setName("");
    } else {
      setName(e.value);
    }
  };

  const handleSearch = (e : any) => {
    alert("buscando")
  }

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="container">
        {/*for searching employees by their name*/}
        <div className="row">
          <div className="col-md">
            <label className="form-label">Name:</label>
            <Select
              onChange={handleChangeSelect}
              value={options.find((obj) => obj.value === name)}
              options={options}
              isClearable
            />
          </div>
          <div className="col-md">
            <label className="form-label">Members</label>
            <Select
              onChange={handleChangeSelect}
              value={options.find((obj) => obj.value === name)}
              options={options}
              isClearable
              isMulti
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">&nbsp;</label>
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              <FaIcons.FaSearch className="mb-1" />
              &nbsp;&nbsp;Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamSearch;
