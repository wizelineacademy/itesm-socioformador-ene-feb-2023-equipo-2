import React from "react";

import { useHasMounted } from "@/components/useHasMounted";


interface ProfileTextBoxProps {
  boxTitle: string;
  boxText: string;
}

const ProfileTextBox = (props: ProfileTextBoxProps) => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="row">
        <div className="container bg-light border p-4">
          <div className="card-body d-flex flex-row">
            <h4>{props.boxTitle}</h4>
          </div>
          <div className="card-body d-flex flex-row">
            {props.boxText}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTextBox;