import React from "react";
import Image from "next/image";

//images
import imgExample from "src/images/wizeline_bckground.png";
import Menu from "@/components/Menu";
import ProfileTextBox from "@/components/ProfileTextBox";
import ProfileListBox from "@/components/ProfileListBox";
import { useHasMounted } from "@/components/useHasMounted";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";

const profileData = [
  {
    isActive: 1,
    clientName: 'Mario Isaí Robles Lozano',
    clientLocation: 'Monterrey',
    clientEnterprise: 'Microsoft',
  },
]

const perfil = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();

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
                <h3 className="ml-5">Nombre</h3>
                <h5 className="ml-5">Senior Software Engineer</h5>
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
