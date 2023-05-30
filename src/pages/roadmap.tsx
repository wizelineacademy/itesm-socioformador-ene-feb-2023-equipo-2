import React from "react";
import Menu from "@/components/Menu";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useHasMounted } from "@/components/useHasMounted";
import { AutoprefixerIconConfig } from "@patternfly/react-icons";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/router";



interface apiResponse {
  id: number,
  name: string,
  linkedinlink: string,
  cvfile: string,
  profileimage: string,
  inforoadmap: string
}

interface roadMap {
  name: string,
  description: string,
  previous_knowledge: string,
}

function Roadmap() {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
  const router = useRouter();


  const [selectedMenu, setSelectedMenu] = useState("");
  const [data, setData] = useState<apiResponse[]>([]);
  const [roadmap, setRoadmap] = useState<any>([]);
  const [isRoadmap, setIsRoadmap] = useState(false);

  const { user, error, isLoading } = useUser();

  console.log("user => ", user);
  console.log("error => ", error);
  console.log("isLoading => ", isLoading);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (roadmap?.tools) {
      setIsRoadmap(true)
    }
    else (
      router.push("/generar-perfil")
    )
  }, roadmap)

  const getParsedJson = (string: string) => {
    //removing breakpoints and "/" characters
    let cleanString = string.replace(/\\n|\\r|\//gm, "");
    //removing non printable characters
    let printableStr = cleanString.replace(/[^\x20-\x7E]/g, '');
    //removing non ASCII characters
    let finalString = printableStr.replace(/[^\x00-\x7F]/g, '');

    console.log("final string", finalString)

    let parsedJson = JSON.parse(finalString)

    return parsedJson;


  }

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:3000/api/getRoadMap"
    );
    const json = await response.json();
    const data: any = json as apiResponse[];
    const obj = data?.userRoadMap?.inforoadmap

    //calling function to clean string only if there are a string to parse
    try {
      let jsonString = getParsedJson(obj)
      let finalJson = JSON.parse(jsonString);
      setRoadmap(finalJson)
    } catch (e: any) {
      console.log("JSON not parsed");
    }

  };

  if (!hasMounted) {
    return null;
  }

  console.log("roadmap => ", roadmap?.tools)

  return (
    <div>
      <Menu
        titulo={"Roadmap"}
        descripcion={
          "Our AI suggests new technologies and programming languages based on your abilities and provides specific learning dates."
        }
      />

      <div className="container">
        {isRoadmap &&
          <div className="row">
            <div className="col-3">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                {roadmap?.tools.map((element: any) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Link
                      className={
                        element.name == selectedMenu
                          ? "nav-link active selectedAncore nav-roadmap"
                          : "nav-link nav-roadmap"
                      }
                      id={element.name + "-tab"}
                      data-toggle="pill"
                      href={"#" + element.name}
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                      onClick={() => setSelectedMenu(element.name)}
                      style={{
                        color:
                          element.name === selectedMenu
                            ? "white !important"
                            : "black !important",
                      }}
                    >
                      {element.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="col-9">
              <div className="tab-content" id="v-pills-tabContent">
                {roadmap?.tools.map((element: any) => {
                  console.log("selected menu => ", selectedMenu);
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div
                      className={
                        element.name == selectedMenu
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id={element.name.toString()}
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                    >
                      <h1>{element.description}</h1>

                      <br />

                      <h2>Description</h2>
                      {element.description}

                      <h2>Previous Knowledge</h2>
                      {element.previous_knowledge}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        }

        {
          !isRoadmap && <div>
            <h1>You will be redirected to Perfil Generation page because you have not your roadmap generated</h1>
          </div>
        }

      </div>
    </div>
  );
}

export default Roadmap;
