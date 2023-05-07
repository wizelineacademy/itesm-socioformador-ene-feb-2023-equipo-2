import React, { useState, useEffect } from 'react';
import Image from "next/image";

//images
import imgExample from "src/images/wizeline_bckground.png";
import Menu from "@/components/Menu";
import ProfileTextBox from "@/components/ProfileTextBox";
import ProfileListBox from "@/components/ProfileListBox";
import { useHasMounted } from "@/components/useHasMounted";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";

interface infoaboutformat {
  name: string,
  position: string,
  location: string,
  experience: [],
  skills: []
}

const getParsedJson = (string: string) => {
  //removing breakpoints and "/" characters
  let cleanString = string.replace(/\\n|\\r|\//gm, "");
  
  //replacing accenting characters with their ASCII normal variant.
  const replacements = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ñ': 'n',
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y'
  };

  const replaceAccentedCharacters = (text: string): string => {
    const pattern = /[àáâãäåèéêëìíîïñòóôõöùúûüýÿ]/g;
    return text.replace(pattern, (match) => replacements[match] || match);
  };

  let replacementString = replaceAccentedCharacters(cleanString)

  //removing non ASCII characters
  let finalString = replacementString.replace(/[^\x00-\x7F]/g, '');

  console.log("final string", finalString)
  let parsedJson = JSON.parse(finalString)

  return parsedJson;

}


const perfil = () => {
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const hasMounted = useHasMounted();
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:3000/api/getInfoData"
    );
    const json = await response.json();
    const data: any = json as infoaboutformat[];

    console.log("json sin procesar", data)

    //calling function to clean string
    let jsonString = getParsedJson(data)

    setEmployeeInfo(jsonString)
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  if (!hasMounted || isLoading) { // Check if data is still loading
    return <div>Loading...</div>;
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
                <h3 className="ml-5">{employeeInfo.name}</h3>
                <h5 className="ml-5">{employeeInfo.position}</h5>
                <h6 className="ml-5">{employeeInfo.location}</h6>
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
        <ProfileTextBox boxTitle="Past Work" boxText={"gysdfwdmfiguhidgr"} />
        <ProfileListBox boxTitle="Skills" />
          {}
      </div>
    </>
  );
};

export default perfil;
