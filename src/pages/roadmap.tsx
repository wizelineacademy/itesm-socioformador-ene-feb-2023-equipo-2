import React from "react";
import Menu from "@/components/Menu";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useHasMounted } from "@/components/useHasMounted";
import { AutoprefixerIconConfig } from "@patternfly/react-icons";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/router";

const roadmapData = "{\n'tools':[\n{\n'name': 'React',\n'description': 'Biblioteca de JavaScript para construir interfaces de usuario interactivas y reutilizables.',\n'previous_knowledge': 'Conocimientos básicos en HTML, CSS y JavaScript'\n},\n{\n'name': 'Redux',\n'description': 'Librería para manejar el estado de una aplicación de manera predecible.',\n'previous_knowledge': 'Conocimientos en React y en programación con JavaScript'\n},\n{\n'name': 'TypeScript',\n'description': 'Lenguaje de programación que es una superset de JavaScript que añade tipos estáticos y una serie de herramientas para mejorar el proceso de desarrollo.',\n'previous_knowledge': 'Conocimientos en programación con JavaScript y en desarrollo web'\n},\n{\n'name': 'Vue.js',\n'description': 'Framework progresivo de JavaScript para la construcción de interfaces de usuario.',\n'previous_knowledge': 'Conocimientos básicos en HTML, CSS y JavaScript'\n},\n{\n'name': 'Angular',\n'description': 'Framework de JavaScript para la construcción de aplicaciones web SPA con un alto rendimiento y una gran escalabilidad.',\n'previous_knowledge': 'Conocimientos en programación con JavaScript y en desarrollo web'\n}\n]\n}"

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

  const { user, error, isLoading } = useUser();
  console.log(user)

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


  const [selectedMenu, setSelectedMenu] = useState("");
  const [data, setData] = useState<apiResponse[]>([]);
  const [roadmap, setRoadmap] = useState<any>([]);
  const [isRoadmap, setIsRoadmap] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (roadmap) {
  //     setIsRoadmap(true)
  //   }
  //   else (
  //     // router.push("/generar-perfil")
  //     undefined
  //   )
  // }, roadmap)

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
    const json = await response.clone().json()
    const data: any = json as apiResponse[];
    const obj = data?.userRoadMap.inforoadmap
    console.log(data.userRoadMap.inforoadmap)


    //calling function to clean string only if there are a string to parse
    try {
      let jsonString = getParsedJson(obj)
      let finalJson = JSON.parse(jsonString);
      console.log("finalJson", finalJson.tools)
      setRoadmap(finalJson.tools)
    } catch (e: any) {
      console.log("JSON not parsed");
    }

  };

  if (!hasMounted) {
    return null;
  }

  console.log("roadmap => ", roadmap)

  return (
    user === undefined ? <div>
      <h1>Loading...</h1>
    </div>
      :
      <div>
        <Menu
          titulo={"Roadmap"}
          descripcion={
            "Our AI suggests new technologies and programming languages based on your abilities and provides specific learning dates."
          }
        />

        <div className="container">
          {/* {roadmap !== undefined &&
            roadmap.map((element: any) => {
              return (
                <div>
                  <h2>
                    {element.name}
                  </h2>
                  <p>
                    {element.description}
                  </p>
                  <b>
                    Previous Knowledge
                  </b>

                  <p>
                    {element.previous_knowledge}
                  </p>
                </div>
              )
            })
          } */}
          {roadmap !== undefined &&
            <div className="row">
              <div className="col-3">
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {roadmap.map((element: any) => {
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
                  {roadmap.map((element: any) => {
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
          {/* <div className="card">
            <div className="card-body">
              <p className="card-text">
                {roadmapData}
              </p>
            </div>
          </div> */}

          {
            !isRoadmap && <div>
              {/* <h1>You will be redirected to Perfil Generation page because you have not your roadmap generated</h1> */}
            </div>
          }

        </div>
      </div>
  );
}

export default Roadmap;
