import React, { useState } from "react";
import Select from "react-select";
import * as FaIcons from 'react-icons/fa';
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";

const skills = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
  const [skill, setSkill] = useState("");

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <Menu
        titulo="Skills"
        descripcion="To utilize the following section, it is necessary to have already created the Departments in the database or to have them established beforehand."
      />
      <div className="container">
        <label htmlFor="department" className="form-label">
          Select department:
        </label>
        <Select placeholder="Departamento..." />
        <label htmlFor="department" className="form-label">
          What skill would you like to add:
        </label>
        <input
          className="form-control"
          type={"text"}
          id="skill"
          autoComplete="off"
          onChange={(e) => setSkill(e.target.value)}
          value={skill}
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

export default skills;
