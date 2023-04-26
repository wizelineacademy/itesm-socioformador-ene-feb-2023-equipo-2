import React, {useState} from "react";
import Menu from "@/components/Menu";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";

import TeamSearch from "@/components/TeamSearch";
import TeamCreation from "@/components/TeamCreation";
import EmployeeCard from "@/components/EmployeeTable";
import { useHasMounted } from "@/components/useHasMounted";

interface CardProps {
  teamName: String;
}

const TeamList = (props: CardProps) => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className='container my-4'>
        <div className="row">
          <h4 className="mb-3"> Team: {props.teamName} </h4>
        </div>
        <EmployeeCard pageType={"listForEmployee"} />
      </div>
    </>
    );
  };
  
  export default TeamList;
  