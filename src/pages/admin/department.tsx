import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";

const department = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
  const [name, setName] = useState("")

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Menu
        titulo="Department"
        descripcion="In order to establish a connection between skills and departments, it is necessary for them to be directly linked. Create a department to be later linked to various skills"
      />
      <div className="container">
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
        {/* Submit button */}
        <button className="btn btn-primary mt-3">
          <FaIcons.FaPlus className="mb-1" />
          &nbsp;&nbsp;Add Department
        </button>
      </div>
    </>
  );
};

export default department;
