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
  const [userData, setUserData] = useState<perfilInterface>()



  const { user, error, isLoading } = useUser();

  const idUser = getAuth0Id(user?.sub)
  console.log(idUser)

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 29518,
      }),
    };

    fetch(process.env.NEXT_PUBLIC_API_URL + "/get-userInfoProfile", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Información de usuario obtneida correcatmente");
        setUserData(data);
      })
      .catch((error) => console.error("Error al obtener informacion de usuario"));
  }, [])


  if (userData !== undefined) {
    // @ts-ignore
    console.log("user Data => ", parseJsonString(userData?.infoabout))
    setUserData(parseJsonString(userData?.infoabout))
  }

  if (!hasMounted) {
    return null;
  }

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
                <h3 className="ml-5">{userData?.name}</h3>
                <h5 className="ml-5">Intern</h5>
                <h6 className="ml-5">Guadalajara</h6>
                <h6 className="ml-5">correo@gmail.com</h6>
                <Link href="/generar-perfil" className="a-navbar">
                  <button className="btn btn-primary w-10 mt-auto">
                    <FaIcons.FaUserAlt className="mb-1" />
                    &nbsp;&nbsp;Editar perfíl
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ProfileTextBox boxTitle="About Me" boxText="gysdfwdmfiguhidgr" />
        <ProfileTextBox boxTitle="Past Work" boxText="gysdfwdmfiguhidgr" />
        <ProfileListBox boxTitle="Skills" />

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