import React from "react";
import Menu from "@/components/Menu";
import Link from "next/link";

import { useState, useEffect } from "react";

import { useHasMounted } from "@/components/useHasMounted";

import { useUser } from '@auth0/nextjs-auth0/client';


interface apiResponse {
  _id: string;
  name: string;
  description: string;
  virtualTourURL: string;
}

function Roadmap() {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

  const [selectedMenu, setSelectedMenu] = useState("");
  const [data, setData] = useState<apiResponse[]>([]);

  const { user, error, isLoading } = useUser();

  console.log("user => ", user);
  console.log("error => ", error);
  console.log("isLoading => ", isLoading);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://admin.marco.org.mx/api/expos/current"
    );
    const json = await response.json();
    setData(json as apiResponse[]);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      return <a href="/api/auth/logout">Logout</a>;
      <Menu
        titulo={"Roadmap"}
        descripcion={
          "Our AI suggests new technologies and programming languages based on your abilities and provides specific learning dates."
        }
      />

      <div className="container">
        <div className="row">
          <div className="col-3">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {data.map((example) => {
                return (
                  <a
                    className={
                      example._id == selectedMenu
                        ? "nav-link active selectedAncore nav-roadmap"
                        : "nav-link nav-roadmap"
                    }
                    id={example._id + "-tab"}
                    data-toggle="pill"
                    href={"#" + example._id}
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                    onClick={() => setSelectedMenu(example._id)}
                    style={{
                      color:
                        example._id === selectedMenu
                          ? "white !important"
                          : "black !important",
                    }}
                  >
                    {example.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content" id="v-pills-tabContent">
              {data.map((example) => {
                console.log("selected menu => ", selectedMenu);
                return (
                  <div
                    className={
                      example._id == selectedMenu
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    id={example._id.toString()}
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    {example.description}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
