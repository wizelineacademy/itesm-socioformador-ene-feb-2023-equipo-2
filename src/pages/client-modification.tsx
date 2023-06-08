import React, { Fragment, useState, useEffect, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import Menu from "@/components/Menu";
import { useHasMounted } from "@/components/useHasMounted";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { projectContext, projectListContext } from "@/context/projectsContext";
import { clientContext, clientListContext } from "@/context/clientContext";
import { useRouter } from "next/router";

const clientModification = () => {
  const hasMounted = useHasMounted();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [erased, setErased] = useState(false);

  const router = useRouter();
  let clientID = router.query.slug;

  let link = process.env.NEXT_PUBLIC_API_URL;

  const options = [
    { value: false, label: "Disable" },
    { value: true, label: "Enable" },
  ];

  const handleSendForm = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: clientID,
        name: name,
        email: email,
        phone: phone,
        erased: erased,
      }),
    };
    fetch(link + "/updateCurrentClient", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
      });

    window.location.href = '/clients';
  };

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: clientID }),
    };
    fetch(link + "/getCurrentClient", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setErased(data.erased);
      });
  }, [clientID]);

  const handleChangeSelect = (e: any | null) => {
    if (e === null) {
      setErased(false);
    } else {
      setErased(e.value);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Menu titulo={"Client Modification"} descripcion={""} />
      <div className="container bg-light border p-4">
        <div className="mb-4">
          <div className="row">
            <div className="col-md">
              <label className="form-label">Client Name:</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md">
              <label className="form-label">Email:</label>
              <input
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <label className="form-label">Phone:</label>
              <input
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-md">
              <label className="form-label">Email:</label>
              <Select
                onChange={handleChangeSelect}
                value={options.find((obj) => obj.value === erased) || ""}
                options={options}
                isClearable
              />
            </div>
          </div>
          {/* Submit button */}
          <button className="btn btn-primary mt-3" onClick={handleSendForm}>
            <FaIcons.FaUserTie className="mb-1" />
            &nbsp;&nbsp;Update client
          </button>
        </div>
      </div>
    </>
  );
};

export default clientModification;
