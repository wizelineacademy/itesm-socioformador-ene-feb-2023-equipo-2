import React from 'react'
import MenuAssociates from '@/components/MenuAssociates'
import { useHasMounted } from "@/components/useHasMounted";

const clients = () => {
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

export default clients