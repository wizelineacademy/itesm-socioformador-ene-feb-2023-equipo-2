import React, { useEffect, useState } from "react";
import Image from "next/image";

//images
import imgExample from "src/images/wizeline_bckground.png";
import Menu from "@/components/Menu";
import ProfileTextBox from "@/components/ProfileTextBox";
import ProfileListBox from "@/components/ProfileListBox";
import { useHasMounted } from "@/components/useHasMounted";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import { getAuth0Id } from '../utils/getAuth0Id'
import { parseJsonString } from "@/utils/parseJsonString";
import { parseJsonStringProfile } from "@/utils/parseJsonStringProfile";

interface perfilInterface {
  name: string;
  position: string;
  location: string;
  Experience: {
    job_title: string;
    job_company: string;
    job_duration: string;
    job_location: string;
  }[];
  Skills: string[];
}

const perfil = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
  const [userData, setUserData] = useState<perfilInterface>();
  const [isLoadingData, setIsLoadingData] = useState(true);

  const { user, error, isLoading } = useUser();

  const idUser = getAuth0Id(user?.sub)
  console.log(idUser)

  

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const info = urlParams.get('info');
    // @ts-ignore
    const idProfile = parseInt(info);
    console.log(info);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: idProfile,
      }),
    };
    let link = process.env.NEXT_PUBLIC_API_URL;
    
    fetch(link + "/get-userInfoProfile", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Información de usuario obtneida correcatmente");
        console.log("Data received:", data);
        const parsedData = parseJsonStringProfile(data.infoabout);
        console.log("Info parseada", parsedData);
        setUserData(parsedData);
        setIsLoadingData(false);

      })
      .catch((error) => {
        console.error("Error al obtener informacion de usuario", error);
        setIsLoadingData(false);
      });

  }, [])


  if (userData !== undefined) {
    // @ts-ignore
    //console.log("user Data => ", parseJsonString(userData?.infoabout))
    //setUserData(parseJsonString(userData.infoabout));
  }

  if (!hasMounted || isLoading || !userData) {
    // Check if data is still loading or userData is undefined
    return null; // Or render a loading indicator
  }

  if (isLoadingData) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  console.log(userData)

  return (
    <>
      <Menu titulo={""} descripcion={" "} />
      <div className="container mt-4">
        <div className="row">
          <div className="container bg-light border p-4">
            <div className="d-flex flex-row">
              <div className="col-3">
                <Image src={imgExample}
                  alt="Wizeline Background"
                  loading="eager"
                  width={200}
                  height={200}
                  className="image-circle" />
              </div>
              <div className="col-5">
                <h3 className="ml-5">{userData?.name ?? "No name available"}</h3>
                <h5 className="ml-5">{userData?.position ?? "No position available"}</h5>
                <h6 className="ml-5">{userData?.location ?? "No location available"}</h6>
                <h6 className="ml-5">correo@gmail.com</h6>
              </div>
            </div>
          </div>
        </div>
        {/* Section of showing the Experience*/}
        {userData?.Experience.map((experience, index) => (
          <div key={index} className="row">
            <div className="container bg-light border p-4">
              <div className="d-flex flex-row">
                <div className="col-3">
                  <h4>Past Work</h4>
                </div>
                <div className="col-5">
                  <h5>Experience #{index + 1}:</h5>
                  <p>Job Title: {experience.job_title}</p>
                  <p>Company: {experience.job_company}</p>
                  <p>Duration: {experience.job_duration}</p>
                  <p>Location: {experience.job_location}</p>
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* Display skills */}
        <div className="row">
          <div className="container bg-light border p-4">
            <div className="d-flex flex-row">
              <div className="col-3">
                <h4>Skills</h4>
              </div>
              <div className="col-5">
                {userData?.Skills.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/*<div className="col-3">
            <div className="card align-items-center">
              <div className="card-body">
                <Image
                  src={imgExample}
                  alt="Wizeline Background"
                  loading="eager"
                  width={200}
                  height={200}
                  className="makeImageCircular mt-4"
                />
                <br />
                <br />
                <h5 className="card-title">Andres Fuentes Alanis</h5>
                <p className="card-text">Gerente de Ingeniería</p>
                <br />
                <br />
              </div>
            </div>

            <button type="button" className="btn btn-primary w-100 mt-3 p-3">
              Ver Roadmap
            </button>
            <button type="button" className="btn btn-secondary w-100 mt-3 p-3">
              Editar perfil
            </button>
          </div>
          <div className="col-9">
            <div className="container">
              <div className="row vh-25 m-2">
                <div id="profileCardSize1" className="col-6">
                  <div className="card w-100 h-100 align-items-center">
                    <div className="card-body"></div>
                  </div>
                </div>
                <div id="profileCardSize1" className="col-6">
                  <div className="card w-100 h-100 align-items-center">
                    <div className="card-body"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-3">
              <div id="profileCardSize2" className="col-12">
                <div className="card w-100 h-100 align-items-center">
                  <div className="card-body"></div>
                </div>
              </div>
            </div>
            <div className="row m-3">
              <div id="profileCardSize2" className="col-12">
                <div className="card w-100 h-100 align-items-center">
                  <div className="card-body"></div>
                </div>
              </div>
            </div>
          </div>*/}
      </div>
    </>
  );
};

export default perfil;