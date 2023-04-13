import React, { useState } from "react";
import Select from "react-select";
import * as FaIcons from 'react-icons/fa';
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";

const clients = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
  const [name, setName] = useState("");

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <Menu
        titulo="Clients"
        descripcion="To create orders, kindly create a client account first."
      />
      <div className="container">
        <label htmlFor="name" className="form-label">
          Full name:
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
        {/* Submit button */}
        <button className="btn btn-primary mt-3">
          <FaIcons.FaPlus className="mb-1" />
          &nbsp;&nbsp;Add Skill
        </button>
      </div>
    </>
  );
};

export default clients