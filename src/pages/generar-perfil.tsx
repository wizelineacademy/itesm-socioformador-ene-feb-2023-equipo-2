// TODO:
// 1. En "Manual Form", hacer que lea todas las preguntas y genere una respuesta en un textarea
// 2. Pasar lo del textarea a varios fields
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import Select from "react-select";
import { Tab, Tabs, Form } from "react-bootstrap";
import Image from "next/image";
import Head from "next/head";
// Remeber to use ValueType and OptionTypeBase. It shows error but it works.
// import Select, { ValueType, OptionTypeBase } from 'react-select';
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";
import { getChatResponse } from "@/openai/openai";
import { setTimeout } from "timers/promises";
import { propTypes } from "react-bootstrap/esm/Image";
import { getAuth0Id } from '../utils/getAuth0Id'
import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Navbar,
  Nav,
  Button,
  Modal,
  Container,
  NavDropdown,
} from "react-bootstrap";

var AuthenticationClient = require('auth0').AuthenticationClient;

interface apiResponse {
  id: number,
  name: string,
  linkedinlink: string,
  cvfile: string,
  profileimage: string,
  inforoadmap: string
}

const generarPerfil: React.FC = () => {
  const hasMounted = useHasMounted();
  // React Hooks for managing component state
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("")
  const [jobExperience, setJobExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [linkLinkedin, setLinkLinkedin] = useState<string>("");
  const [resLinkLinkedin, setResLinkLinkedin] = useState("");
  const [responseRoadmap, setResponseRoadmap] = useState<any>("");
  const [responseCV, setResponseCV] = useState<any>()
  const [roadmap, setRoadmap] = useState();
  const [userInfo, setUserInfo] = useState<any>();
  const [userRegistrationErrorModal, setUserRegistrationErrorModal] = useState(false)
  const [fetchingGPTinfo, setFetchingGPTinfo] = useState(false)
  const [token, setToken] = useState("")
  const [position, setPosition] = useState<number>()
  const [isUserDataUpdate, setIsUserDataUpdate] = useState(false)
  const [stringPosition, setStringPosition] = useState("")

  console.log("token", token)

  let link = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const { user, error, isLoading } = useUser();
  const userId = getAuth0Id(user?.sub)

  useEffect(() => {
    // Redirect logic here
    if (isLoading) {
      undefined
    } else {
      if (!user) {
        router.push("/");
      }
    }

    // credentials to generate the auth0 token necessary to create new users
    // @ts-ignore
    var auth0 = new AuthenticationClient({
      domain: 'dev-xo3qm08sbje0ntri.us.auth0.com',
      clientId: 'R5DfLlk2CIEX69qaGi0Zf2DgMvQB3oeE',
      clientSecret: 'LaXptxqYUYJhmzssip6CLz4L1oA5c21iLBM5gRA5uexQBV84R8AOxWkX2obX4Pdp'
    });

    // method to geerate the auth0 token necessary to create new users
    auth0.clientCredentialsGrant(
      {
        audience: 'https://dev-xo3qm08sbje0ntri.us.auth0.com/api/v2/',
        scope: 'create:users read:users update:users read:roles update:users_app_metadata',
      },
      function (err: any, response: any) {
        if (err) {
          console.error(err, "error al generar token de auth0")
          console.error(response)
        } else {
          setToken(response?.access_token)
        }

      }
    );

    let id: number = getAuth0Id(user?.sub)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id
      }),
    };

    fetch(link + "/getUserInfoFromDB", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data)
        setResponseCV(data?.infoabout)
        setResponseRoadmap(data?.inforoadmap)
        setName(data?.name)
        setLocation(data?.location)
        setPosition(data?.idposition)
      })
      .catch((error) => console.error("Error obtener informacion de usuario"));

    if (userInfo !== undefined) {

    }

    switch (position) {
      case 1: {
        setStringPosition("Administrador");
        break;
      }
      case 2: {
        setStringPosition("Colaborador");
        break;
      }
      case 3: {
        setStringPosition("Cliente");
        break;
      }
      default: {
        setStringPosition("Administrador");;
        break;
      }
    }
  }, [isLoading]);

  console.log("userInfo", userInfo)

  const flaskLinkedin = (linkLinkedin: string) => {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          link_linkedin: linkLinkedin,
        }),
      };

      fetch("http://127.0.0.1:5000/cv-linkedin", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Flask");
          console.log(data.Message);
          resolve(data.Message);
        })
        .catch((error) => {
          console.error("Error al guardar ruta de aprendizaje");
          reject(error);
        });
    });
  };

  const handleUserInfoModification = async (event: any) => {
    //method to create new users in the auth0 app
    const requestOptionsAuth0NewUser = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      mode: 'no-cors' as RequestMode,
      body: JSON.stringify(
        {
          password: password,
          name: name,
          connection: "Username-Password-Authentication"
        }
      )
    };

    console.log("url => ", `https://dev-xo3qm08sbje0ntri.us.auth0.com/api/v2/users/${userId}`)
    console.log(user?.sub)

    fetch(`https://dev-xo3qm08sbje0ntri.us.auth0.com/api/v2/users/${userId}`, requestOptionsAuth0NewUser)
      .then(response => response.json())
      .then(data => {
        console.log("Usuario actualizado correctamente en Auth0")

        //method to create users in db (only executed if auth0 registration is correct)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              id: userId,
              position: position,
              name: name,
            }
          )
        };
        //sdfgh
        fetch(link + '/update-userInfo', requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log("Usuario actualizado correctamente en BD")
            setIsUserDataUpdate(true)
          })
          .catch(error => {
            console.error(error, "Error al actualizar usuario en BD")
            setUserRegistrationErrorModal(true)
          });


        event.preventDefault();
      })
      .catch(error => {
        console.error("Error al guardar usuario en Auth0")
        setUserRegistrationErrorModal(true)
      });

  }

  const handleOpenAIResponse = async (e: any) => {
    console.log(e.target.id);

    setFetchingGPTinfo(true)

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inforoadmap: responseRoadmap,
        infoabout: responseCV,
        userId: userId
      }),
    };

    fetch(link + "/save-employee-information", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Ruta de aprendizaje guardada exitosamente")

      })
      .catch((error) => console.error("Error al guardar ruta de aprendizaje"));

    let text = "";
    if (e.target.id === "buttonManual") {
      text = jobExperience + "and" + skills;
    } else {
      console.log("React");
      try {
        const response = await flaskLinkedin(linkLinkedin);
        text = response as string;
      } catch (error) {
        console.error("Error:", error);
        return;
      }
    }

    const messageCV = [
      {
        role: "user",
        content:
          "I need a summerized CV based on the information I will give you, and do not use a codebox. This is the following information:" +
          text +
          'Following the previous information, I need your response to be a JSON and to be indented properly to improve readability, if the location on the experience is missing then do not write "job_location": location, ignore the start time and end time and only write the time duration of the experience on "job_duration": duration" and write it on english, follow the following example: {"name": name, "position": ocupation, "location": location, "Experience": [{"job_title": job title, "job_company": company_name, "job_duration": duration, "job_location": "location"}],"Skills": [skill#1, Skill#2, Skill#3, Skill#4, Skill#5, etc.]}',
      },
    ];

    getChatResponse(messageCV).then((about) => {
      setResponseCV(about);
    });

    const auxMessage =
      `Crea una ruta de aprendizaje con 5 herramientas o tecnologías mostrando el nombre de la herramienta o tecnología, la descripción de la misma y los conocimientos previos necesarios para aprenderla tomando en cuenta que es para una persona con este perfil, habilidades y conocimientos: ` +
      skills +
      `.Dame únicamente la información de la ruta de aprendizaje que generaste acorde a los parámetros anteriores y hazlo únicamente en formato json siguiendo de manera muy precisa esta estructura:

          {
            'tools'[
              {
                'name': 'resource name 1',
                'description': vresource description 1',
        'previous_knowledge': 'previous knowledge 1'
              },
              {
                'name': 'resource name 2',
                'description': “resource description 2',
        'previous_knowledge': ”previous knowledge 2
      }
            ]
          }
          `
    const messageRoadmap = [{ role: "user", content: auxMessage }];

    getChatResponse(messageRoadmap).then((res) => {
      setResponseRoadmap(res);
      setFetchingGPTinfo(false)
    });
  };

  const handleSubmit = () => {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inforoadmap: responseRoadmap,
        infoabout: responseCV,
        userId: userId
      }),
    };

    fetch(link + "/save-employee-information", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("Ruta de aprendizaje guardada exitosamente"))
      .catch((error) => console.error("Error al guardar ruta de aprendizaje"));

    setUserRegistrationErrorModal(true)
  };

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  return (
    user === undefined ? <div>
      <h1>Inicia sesión para acceder</h1>
    </div>
      :
      <>
        <Menu
          titulo={"Complete Profile"}
          descripcion={
            "In order for artificial intelligence to generate a complete profile, we need you to provide us with your employment and educational information. You can do it in several ways: through your LinkedIn profile, by filling in the fields of our web application or by uploading your resume to our platform."
          }
        />
        <div className="container">
          <div className="row">
            <div className="col-md">
              <label className="form-label">Name:</label>
              <input
                className="form-control"
                type="text"
                onChange={(e: any) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="col-md">
              <label className="form-label">Location:</label>
              <input
                className="form-control"
                type="text"
                onChange={(e: any) => setLocation(e.target.value)}
                value={location}
              />
            </div>
            <div className="col-md">
              <label className="form-label">Password:</label>
              <input
                className="form-control"
                type="text"
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="col-md">
              <label className="form-label">Position:</label>
              <input
                className="form-control"
                type="text"
                onChange={(e: any) => setPosition(e.target.value)}
                value={stringPosition}
                disabled
              />
            </div>

          </div>

          <div className="mt-4 mb-4">
            <Tabs
              defaultActiveKey="linkedin"
              id="fill-tab-generar-perfil"
              className="mb-3"
              fill
            >
              <Tab eventKey="linkedin" title="LinkedIn Profile">
                <label className="form-label">
                  Please provide the link to your LinkedIn profile for so that we
                  can carry out an analysis of your account.
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="linkLinkedin"
                  autoComplete="off"
                  onChange={(e) => setLinkLinkedin(e.target.value)}
                  value={linkLinkedin}
                />
                {/* Submit button */}
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleOpenAIResponse}
                  id="buttonLinkedin"
                >
                  <FaIcons.FaLinkedin className="mb-1" />
                  &nbsp;&nbsp;Analyse Profile
                </button>

                <br></br>
                <br></br>

                <label className="form-label">AI-generated CV Summary...</label>

                <textarea
                  rows={7}
                  className="form-control"
                  id="projectDescription"
                  autoComplete="off"
                  value={responseCV}
                  onChange={(e: any) => setResponseCV(e.target.value)}
                  placeholder="AI's response will generate after clicking the Generate button..."
                />

                {/* CV from LinkedIn generated by AI */}
                <label className="form-label">AI-generated Roadmap...</label>
                <textarea
                  rows={7}
                  className="form-control"
                  id="projectDescription"
                  autoComplete="off"
                  value={responseRoadmap}
                  onChange={(e: any) => setResponseRoadmap(e.target.value)}
                  placeholder="AI's response will generate after clicking the Generate button..."
                />
              </Tab>
              <Tab eventKey="manual" title="Manual Form">
                <label className="form-label">
                  Please write about your job experience, specifying your
                  position, the company, and how long you worked there.
                </label>
                <textarea
                  className="form-control"
                  onChange={(e: any) => setJobExperience(e.target.value)}
                  value={jobExperience}
                />
                <label className="form-label">
                  Please write about your skills:
                </label>
                <textarea
                  className="form-control"
                  onChange={(e: any) => setSkills(e.target.value)}
                  value={skills}
                />
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleOpenAIResponse}
                  id="buttonManual"
                >
                  <FaIcons.FaBrain className="mb-1" />
                  &nbsp;&nbsp;Make Resume
                </button>

                <br></br>
                <br></br>

                <label className="form-label">AI-generated CV Summary...</label>

                <textarea
                  rows={7}
                  className="form-control"
                  id="projectDescription"
                  autoComplete="off"
                  value={responseCV}
                  onChange={(e: any) => setResponseCV(e.target.value)}
                  placeholder="AI's response will generate after clicking the Generate button..."
                />

                {/* CV from LinkedIn generated by AI */}
                <label className="form-label">AI-generated Roadmap...</label>
                <textarea
                  rows={7}
                  className="form-control"
                  id="projectDescription"
                  autoComplete="off"
                  value={responseRoadmap}
                  onChange={(e: any) => setResponseRoadmap(e.target.value)}
                  placeholder="AI's response will generate after clicking the Generate button..."
                />
              </Tab>
            </Tabs>
            <button
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              id="buttonManual"
            >
              <FaIcons.FaSave className="mb-1" />
              &nbsp;&nbsp;Save
            </button>
          </div>
        </div>
        <Modal
          show={
            userRegistrationErrorModal ? true : false
          }
          backdrop="static"
          centered
        >
          <Modal.Header>
            <Modal.Title>User Profile & Roadmap Generated Succesfully!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={(e) => setUserRegistrationErrorModal(false)}>
              Accept
            </Button>
            <Button variant="primary" onClick={
              (e) => {
                setUserRegistrationErrorModal(false)
                router.push("/profile")
              }
            }>
              Go to profile menu
            </Button>
            <Button variant="primary" onClick={
              (e) => {
                setUserRegistrationErrorModal(false)
                router.push("/roadmap")
              }
            }>
              Go to roadmap menu
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={
            fetchingGPTinfo ? true : false
          }
          backdrop="static"
          centered
        >
          <Modal.Header>
            <Modal.Title>Generating roadmap and profile...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This can take some time, sorry :D</p>
            <div className="spinner-border text-danger" role="status"></div>
          </Modal.Body>
        </Modal>
      </>
  );
};
export default generarPerfil;
