// TODO:

// The presentation of the user management features has not been decided yet.
// It could be implemented as a pop-up, another page, or as part of the same page.
// Some of the features that we want to include are:
//   - Add button: This button will allow the user to add new accounts to the system.
//   - Edit button: This button will allow the user to edit existing accounts.
//   - Delete button: This button will allow the user to delete accounts from the system.
// For now, add form to add / edit / erase at the boton of page

// To make it easier for users to find specific employees, we will also include the EmployeeSearch.tsx component.
// This component will allow users to search for employees by name, department, or other criteria.

// We will display a table showing all the users in the system.
// This table will include basic information about each user, such as their name, email, and role.

import React, { useState } from "react";
import Select from 'react-select'
import * as FaIcons from "react-icons/fa";

import { useHasMounted } from "@/components/useHasMounted";

const EmployeeCreation = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  function generateRandomPassword(): string {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }

  function generateRandomUserId(): number {
    const characters = "0123456789";
    let userId = "";
    for (let i = 0; i < 5; i++) {
      userId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    let userIdInt = +userId
    return userIdInt;
}

const password = generateRandomPassword()
const userId = generateRandomUserId()


  const handleSubmit = async (event: any) => {

    const requestOptionsAuth0 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                'Authorization': "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilc3blBjcjBUc29MMnlCVmFueHh5TCJ9.eyJpc3MiOiJodHRwczovL2Rldi14bzNxbTA4c2JqZTBudHJpLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJSNURmTGxrMkNJRVg2OXFhR2kwWmYyRGdNdlFCM29lRUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYteG8zcW0wOHNiamUwbnRyaS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY4MjYzOTMwNCwiZXhwIjoxNjgyNzI1NzA0LCJhenAiOiJSNURmTGxrMkNJRVg2OXFhR2kwWmYyRGdNdlFCM29lRSIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.e_UH3xgnk0ugFBCHKwjHzwrDbLuZDrrJhDpaa-PSCyw-FMB6g9Xg0e2_51adProJ0D4VjixrNPUFSIPQgaWjs5jzxhtHKmwMFyNxwYaA0MaNyecnSz-AADU6bY5QoSq_Xqh67faOmzq_9ttcbQxYD3VGPwnWHpvDY_zyMdiKa_wt-iaIcMHCauGZ_DwmpmNG_kIRqgm151VsAZKXEaH0jK3T8hqpY5Yq9zDSjVEWQ0Y6g6NMMWEFr7KLWDZo8ATr1VUQImOrq0Rnfj9YJOJ4siuXmkYfFXWoTEyWdHm1LrKx7NW78JnOrBATVsOTUhJk-izTpdc8sj4W4daFhmwIYw"},
      body: JSON.stringify(
        {
          email: email,
          user_id: userId.toString(),
          connection: "Username-Password-Authentication",
          password: generateRandomPassword(),
          email_verified: true
        }
      )
    };

      fetch('https://dev-xo3qm08sbje0ntri.us.auth0.com/api/v2/users', requestOptionsAuth0)
      .then(response => response.json())
      .then(data => console.log("Usuario guardado correctamente en Auth0"))
      .catch(error => console.error("Error al guardar usuario en Auth0"));

    //sending petition to generate a new user in auth0 and db
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          email: email,
          userId: userId
        }
      )
    };

      fetch('http://localhost:3000/api/createUsers', requestOptions)
      .then(response => response.json())
      .then(data => console.log("Usuario guardado correctamente"))
      .catch(error => console.error("Error al guardar usuario"));
    
  
    event.preventDefault(); 
  };

  const roleOptions = [
    { value: 'monterrey', label: 'Monterrey' },
    { value: 'saltillo', label: 'Saltillo' },
    { value: 'reynosa', label: 'Reynosa' },
    { value: 'victoria', label: 'Ciudad Victoria' },
    { value: 'lapaz', label: 'La Paz' },
    { value: 'guadalajara', label: 'Guadalajara' },
    { value: 'queretaro', label: 'Queretaro' },
  ]

  const departmentOptions = [
    { value: 'monterrey', label: 'Monterrey' },
    { value: 'saltillo', label: 'Saltillo' },
    { value: 'reynosa', label: 'Reynosa' },
    { value: 'victoria', label: 'Ciudad Victoria' },
    { value: 'lapaz', label: 'La Paz' },
    { value: 'guadalajara', label: 'Guadalajara' },
    { value: 'queretaro', label: 'Queretaro' },
  ]

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* componente con los inputs de generar perfil */}
        <div className="container">
          <div className="row">
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
                placeholder="Select..."
                required
              />
            </div>
            <div className="col-md">
              <label htmlFor="role" className="form-label">
                Role:
              </label>
              {/*<input
                className="form-control"
                type="text"
                id="role"
                onChange={(event) => setRole(event.target.value)}
                value={role}
                required
              />*/}
              <Select 
                isClearable
                options={roleOptions} />
            </div>
            <div className="col-md">
              <label htmlFor="department" className="form-label">
                Departament:
              </label>
              {/*<input
                className="form-control"
                type="text"
                id="department"
                onChange={(event) => setDepartment(event.target.value)}
                value={department}
                required
              />*/}
              <Select 
                isClearable
                options={departmentOptions} />
            </div>
            <div className="col-md mt-auto justify-content-end">
              <button
                className="btn btn-primary w-50"
                onClick={handleSubmit} >
                <FaIcons.FaTimes className="mb-1" />
                &nbsp;&nbsp;Cancel
              </button>
              <button
                className="btn btn-primary w-50"
                onClick={handleSubmit} >
                <FaIcons.FaPlus className="mb-1" />
                &nbsp;&nbsp;Add
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default EmployeeCreation;
