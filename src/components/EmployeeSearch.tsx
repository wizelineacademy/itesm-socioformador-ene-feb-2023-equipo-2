// TODO:
// Cambiar los inputs por select boxes
// https://react-select.com/home

import React from 'react';
import Select from 'react-select'
import { useHasMounted } from "@/components/useHasMounted";


const specialityOptions = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'data', label: 'Data Manager' },
  { value: 'quality', label: 'Quality Manager' },
  { value: 'cibersecurity', label: 'Cibersecurity' },
  { value: 'networks', label: 'Network Administrator' },
  { value: 'mobile', label: 'Mobile Developer' },
]

const techOptions = [
  { value: 'c', label: 'C/C++' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'cs', label: 'C#' },
  { value: 'react', label: 'REACT' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'remix', label: 'REMIX' },
  { value: 'nextjs', label: 'Next JS' },
]

const locationOptions = [
  { value: 'monterrey', label: 'Monterrey' },
  { value: 'saltillo', label: 'Saltillo' },
  { value: 'reynosa', label: 'Reynosa' },
  { value: 'victoria', label: 'Ciudad Victoria' },
  { value: 'lapaz', label: 'La Paz' },
  { value: 'guadalajara', label: 'Guadalajara' },
  { value: 'queretaro', label: 'Queretaro' },
]

const EmployeeSearch = () =>  {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  {/*funtion to filter the list using the data from the inputs*/}
  const handleFilterList = () => {
    alert("se van a buscar los empleados con lo seleccionado");
  };

  return (
    <>
      <div className="container my-4">

        {/*for searching employees by their name*/}
        <div className="row">
          <div className="col-md-3">
            <label className="form-label">
              Name:
            </label>

            <input
              className="form-control"
              type="text"
              id="nameSearch"
              autoComplete="off"
              required
              placeholder="Select..."
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">
              Speciality:
            </label>
            <Select 
              isClearable
              options={specialityOptions} />
          </div>

          <div className="col-md-3">
            <label className="form-label">
              Technologies:
            </label>
            <Select 
              isMulti 
              options={techOptions} />
          </div>

          <div className="col-md-3">
            <label className="form-label">
              Location:
            </label>
            <Select 
              isClearable
              options={locationOptions} />
          </div>
        </div>

        {/*<div className="col-md-4 mt-auto">
          <button className="btn btn-primary btn-block" onClick={handleFilterList}>
            <FaIcons.FaSearch className="mb-1" />
            &nbsp;&nbsp;Filtrar
          </button>
        </div>*/}
      </div>
    </>
  );
}

export default EmployeeSearch;
