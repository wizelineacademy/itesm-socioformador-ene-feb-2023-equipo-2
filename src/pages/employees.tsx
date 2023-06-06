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

import React, { useState, useEffect } from "react";
import EmployeeSearch from "@/components/EmployeeSearch";
import EmployeeTable from "@/components/EmployeeTable";
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";
import { getAuth0Id } from '../utils/getAuth0Id'

import { EmployeeListContext, EmployeeContext } from "@/context/employeeContext";
import { RoleContext } from "@/context/roleContext";
import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0/client';

const employees = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [userInfo, setUserInfo] = useState<any>()

  const router = useRouter();
  const { user, error, isLoading } = useUser();
  let link = process.env.NEXT_PUBLIC_API_URL;

  console.log("userInfo -> ", userInfo)

  useEffect(() => {
    // Redirect logic here
    if (isLoading) {
      undefined
    } else {
      if (!user) {
        router.push("/");
      }
      let id: number = getAuth0Id(user?.sub)
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: id
        }),
      };

      fetch(link + "/getUserInfoFromDB", requestOptions)
        .then((response) => response.json())
        .then((data) => setUserInfo(data))
        .catch((error) => console.error("Error al guardar ruta de aprendizaje"));
    }
  }, [isLoading]);

  const [addEmployee, setAddEmployee] = useState(false); // True -> A to Z, False -> Z to A

  if (!hasMounted) {
    return null;
  }

  return (
    user === undefined ? <div>
      <h1>Loading...</h1>
    </div>
      :
      <>
        <Menu titulo={"Employees"} descripcion={" "} />
        <RoleContext>
          <EmployeeContext>
            <EmployeeListContext>
              <EmployeeSearch />
              <EmployeeTable pageType={"listForAdmin"} />
            </EmployeeListContext>
          </EmployeeContext>
        </RoleContext>
      </>
  );
};

export default employees;
