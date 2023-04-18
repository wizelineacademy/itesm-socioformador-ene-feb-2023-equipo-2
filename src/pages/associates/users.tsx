// TODO: 

// See the users in the system

// To make it easier for users to find specific employees, we will also include the EmployeeSearch.tsx component. 
// This component will allow users to search for employees by name, department, or other criteria.

// We will display a table showing all the users in the system. 
// This table will include basic information about each user, such as their name, email, and role.

import React from 'react'
import MenuAssociates from '@/components/MenuAssociates'
import { useHasMounted } from "@/components/useHasMounted";

const users = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  return (
    <>
    <MenuAssociates
  titulo={"Complete Profile"}
  descripcion={
    "In order for artificial intelligence to generate a complete profile, we need you to provide us with your employment and educational information. You can do it in several ways: through your LinkedIn profile, by filling in the fields of our web application or by uploading your resume to our platform."
  } />
  </>
  )
}

export default users