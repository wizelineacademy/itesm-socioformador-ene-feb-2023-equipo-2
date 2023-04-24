import React, {useState} from "react";
import Select from "react-select";
import { useHasMounted } from "@/components/useHasMounted";

const companyOptions = [
  { value: "softek", label: "Softek" },
  { value: "microsoft", label: "Microsoft" },
  { value: "macrohard", label: "Macrohard" },
  { value: "meta", label: "Meta" },
  { value: "google", label: "Google" },
  { value: "youtube", label: "Youtube" },
  { value: "twitter", label: "Twitter" },
];

const locationOptions = [
  { value: "monterrey", label: "Monterrey" },
  { value: "saltillo", label: "Saltillo" },
  { value: "reynosa", label: "Reynosa" },
  { value: "victoria", label: "Ciudad Victoria" },
  { value: "lapaz", label: "La Paz" },
  { value: "guadalajara", label: "Guadalajara" },
  { value: "queretaro", label: "Queretaro" },
];

const ClientSearch = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [name, setName] = useState("");

  {
    /*funtion to filter the list using the data from the inputs*/
  }
  const handleFilterList = () => {
    alert("se van a buscar los empleados con lo seleccionado");
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="container">
        {/*for searching employees by their name*/}
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Name:</label>

            <input
              className="form-control"
              onChange={e => e.target.value}
              value={name}
              type="text"
              id="nameSearch"
              autoComplete="off"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Company:</label>
            <Select isClearable options={companyOptions} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Location:</label>
            <Select isClearable options={locationOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientSearch;
