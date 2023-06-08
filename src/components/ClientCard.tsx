import React, { Fragment, useState } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";
import { useContext } from 'react';
import { clientContext, ClientListContext, clientListContext } from "@/context/clientContext";
import { useRouter } from 'next/router';

const ClientCard = () => {
  const clientsContext = useContext(clientContext);
  const clientsListContext = useContext(clientListContext);
  const router = useRouter();

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#EDEDED",
        borderBottomColor: "#FFFFFF",
        borderRadius: "10px",
        outline: "1px solid #FFFFFF",
      },
    },
  };

  interface clientSelectionInterface {
    value: string;
    label: string;
    email: string;
    phone: string;
    erased: boolean;
  }

  let clients = clientsListContext?.selectedClient;

  let columns: TableColumn<clientSelectionInterface>[] = [
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaRegDotCircle
            className={`status-icon-size ${String(row.erased) === 'true' ? "state-active" : "state-inactive" }`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={String(row.erased) === 'true' ? 'Client is active' : 'Client is not active' }
          />
        </Fragment>
      ),
      width: "50px",
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaCircle style={{ color: "black", fontSize: "50px" }} />
        </Fragment>
      ),
      width: "50px",
    },
    {
      name: "Name",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaPencilAlt
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => router.push({pathname: '/client-modification', query: { slug: row.value }})}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit client information"
          />
        </Fragment>
      ),
      width: "50px",
    },
    {
      cell: (row) => (
        <Fragment>
          <div onClick={() => { router.push({ pathname: '/projects', query: { slug: row.value } }); }}>
            <FaIcons.FaClipboardList
              style={{ color: "black", fontSize: "20px", cursor: "pointer" }}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="View client projects"
            />
          </div>
        </Fragment>
      ),
      width: "50px",
    },
    // {
    //   cell: (row) => (
    //     <Fragment>
    //       <FaIcons.FaTrash
    //         style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
    //         onClick={() => handleClientEraseFromSystem()}
    //       />
    //     </Fragment>
    //   ),
    //   width: "50px",
    // },
  ];

  const data = clients?.map((client) => {
    return {
      value: client.value,
      label: client.label,
      email: client.email,
      phone: client.phone,
      erased: client.erased,
    };
  });

  let selectedClientID = clientsContext?.currentClient;
  let filteredData = selectedClientID ? data?.filter(client => client.value === selectedClientID) : data;

  return (
    <>
      <div className="container my-4">
        <DataTable
          columns={columns}
          // @ts-ignore
          data={filteredData}
          customStyles={customStyles}
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default ClientCard;
