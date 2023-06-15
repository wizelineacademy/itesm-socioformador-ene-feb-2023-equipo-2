import React, {useState, useEffect} from 'react'
import { useHasMounted } from "@/components/useHasMounted";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import * as FaIcons from "react-icons/fa";
import Select from "react-select";

const employeeModification = () => {
  const hasMounted = useHasMounted();

  const [name, setName] = useState("")
  const [position, setPosition] = useState(2)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [estatus, setEstatus] = useState(true)

  const router = useRouter();
  let employeeID = router.query.slug;

  let link = process.env.NEXT_PUBLIC_API_URL;

  const options = [
    { value: false, label: "Disable" },
    { value: true, label: "Enable" },
  ];

  const optionsPosition = [
    { value: 1, label: "Admin" },
    { value: 2, label: "Wizeliner" },
  ];

  const handleChangeSelect = (e: any | null) => {
    if (e === null) {
      setEstatus(false);
    } else {
      setEstatus(e.value);
    }
  };

  const handleChangeSelectPosition = (e: any | null) => {
    if (e === null) {
      setPosition(2);
    } else {
      setPosition(e.value);
    }
  };

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: employeeID }),
    };
    fetch(link + "/getCurrentEmployee", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setPosition(data.idposition);
        setEmail(data.email);
        setPassword(data.password)
        setEstatus(data.status);
      });
  }, [employeeID])

  const handleSendForm = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: employeeID,
        name: name,
        idposition: position,
        email: email,
        password: password,
        status: estatus,
      }),
    };
    fetch(link + "/updateCurrentEmployee", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        router.push('/employees')
      });
  };
  
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Menu titulo={"Employee Modification"} descripcion={""} />
      <div className="container bg-light border p-4">
        <div className="mb-4">
          <div className="row">
            <div className="col-md">
              <label className="form-label">Client Name:</label>
              <input
                id = "setNewName"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md">
              <label className="form-label">Email:</label>
              <input
                id = "setNewEmail"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md">
              <label className="form-label">Password:</label>
              <input
                type='password'
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <label className="form-label">Position:</label>
              <Select
                onChange={handleChangeSelectPosition}
                value={optionsPosition.find((obj) => obj.value === position) || ""}
                options={optionsPosition}
                isClearable
              />
            </div>
            <div className="col-md">
              <label className="form-label">Status:</label>
              <Select
                onChange={handleChangeSelect}
                value={options.find((obj) => obj.value === estatus) || ""}
                options={options}
                isClearable
              />
            </div>
          </div>
          {/* Submit button */}
          <button id = "updateUserBtn" className="btn btn-primary mt-3" onClick={handleSendForm}>
            <FaIcons.FaUserCog className="mb-1" />
            &nbsp;&nbsp;Update employee
          </button>
        </div>
      </div>
    </>
  )
}

export default employeeModification