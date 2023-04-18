// TODO: 

// Component orders.tsx, that decides what to show if the user is an admin or a colaborator.

// The presentation of the order management features has not been decided yet. 
// It could be implemented as a pop-up, another page, or as part of the same page.
// Some of the features that we want to include are:
// - Add button: This button will allow the user to add new orders to the system.
// - Edit button: This button will allow the user to edit existing orders.
// - Delete button: This button will allow the user to delete orders from the system.
// Colaborators will just see the orders they are in, they won´t be able to use this buttons, just see the orders in which they are placed.

// To make it easier for users to find specific orders, we will also include an OrderSearch.tsx component. 
// This component will allow users to search for orders by customer name, order ID, or other criteria.

// We will display a table showing all the orders in the system. 
// This table will include basic information about each order, such as order ID, company, etc.

import MenuAssociates from '@/components/MenuAssociates'
import React from 'react'
import { useHasMounted } from "@/components/useHasMounted";

const orders = () => {
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

export default orders