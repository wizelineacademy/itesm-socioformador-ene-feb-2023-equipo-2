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
  const { user, isLoading } = useUser();
  let link = process.env.NEXT_PUBLIC_API_URL;

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
