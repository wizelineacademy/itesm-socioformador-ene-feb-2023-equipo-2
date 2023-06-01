import React, { useEffect, useState } from "react";
import Menu from "@/components/Menu";
import { useRouter } from "next/router";
import { useHasMounted } from "@/components/useHasMounted";
import * as FaIcons from "react-icons/fa";
import { useUser } from '@auth0/nextjs-auth0/client';

const teamModification = () => {
  const hasMounted = useHasMounted();

  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    // Redirect logic here
    if (isLoading) {
      undefined
    } else {
      if (!user) {
        router.push("/");
      }
    }
  }, [isLoading]);

  let teamID = router.query.slug;

  const [teamName, setTeamName] = useState("");

  let link = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: teamID }),
    };
    fetch(link + "/getCurrentTeam?", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setTeamName(data.name);
      });
  }, [teamID]);

  const handleSendForm = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: teamID, name: teamName }),
    };
    fetch(link + "/updateTeamName", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  if (!hasMounted) {
    return null;
  }

  return (
    user === undefined ? <div>
      <h1>Loading...</h1>
    </div>
      :
      <>
        <Menu titulo={"Team Modification"} descripcion={""} />
        <div className="container bg-light border p-4">
          <div className="mb-4">
            <label className="form-label">Team Name:</label>
            <input
              className="form-control"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            {/* Submit button */}
            <button className="btn btn-primary mt-3" onClick={handleSendForm}>
              <FaIcons.FaBrain className="mb-1" />
              &nbsp;&nbsp;Update project
            </button>
          </div>
        </div>
      </>
  );
};

export default teamModification;
