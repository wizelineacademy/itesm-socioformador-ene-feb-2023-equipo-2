import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {
    /*const orders = await prisma.$queryRaw`
      SELECT 
        orders.id AS value, 
        orders.name AS label, 
        orders.orderstatus, 
        to_char(orders.orderstartdate, 'DD-MM-YYYY') AS orderstartdate,
        to_char(orders.orderenddate, 'DD-MM-YYYY') AS orderenddate,
        client.id AS idclient,
        client.name AS clientname, 
        teams.id AS idteam,
        teams.name AS teamname
      FROM orders
      INNER JOIN client
          ON orders.idclient = client.id
      INNER JOIN teams
          ON orders.idteam = teams.id
      WHERE orders.erased = false;
    `;*/

    const orders = await prisma.orders.findMany({
      select: {
        id: true,
        name: true,
        orderstatus: true,
        orderstartdate: true,
        orderenddate: true,
        client: {
          select: {
            id: true,
            name: true
          }
        },
        team: {
          select: {
            id: true,
            name: true
          }
        },
      },
      where: {
        erased: false,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const orders2 = orders.map((project) => {
      return { 
        value: project.id, 
        label: project.name, 
        orderstatus: project.orderstatus, 
        orderstartdate: String(project.orderstartdate).substring(0,16), 
        orderenddate: String(project.orderenddate).substring(0,16),
        idclient: project.client.id,
        clientname: project.client.name,
        idteam: project.team.id,
        teamname: project.team.name,
      }
    });

    const response = {
      orders: orders2,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}

/*
{
    "orders": [
        {
            "value": 11,
            "label": "hello world",
            "orderstatus": "Pending",
            "orderstartdate": "08-06-2023",
            "orderenddate": "08-06-2023",
            "idclient": 15,
            "clientname": "Luis Aguirre",
            "idteam": 6,
            "teamname": "Test Team 2"
        },
        {
            "value": 2,
            "label": "Hospitalary Emergency Transplant System",
            "orderstatus": "Rejected",
            "orderstartdate": "19-05-2023",
            "orderenddate": "19-05-2023",
            "idclient": 5,
            "clientname": "wow",
            "idteam": 1,
            "teamname": "holajs"
        },
        {
            "value": 1,
            "label": "Hospitalary Transplant System",
            "orderstatus": "Approved",
            "orderstartdate": "08-06-2023",
            "orderenddate": "08-06-2023",
            "idclient": 8,
            "clientname": "Lapzo",
            "idteam": 2,
            "teamname": "team222"
        },
        {
            "value": 4,
            "label": "HeyBanco Banking Protection Hack",
            "orderstatus": "Pending",
            "orderstartdate": "03-06-2023",
            "orderenddate": "03-06-2023",
            "idclient": 8,
            "clientname": "Lapzo",
            "idteam": 2,
            "teamname": "team222"
        },
        {
            "value": 7,
            "label": "Kenchana Cup Sleeve Events AI Designer",
            "orderstatus": "Approved",
            "orderstartdate": "02-06-2023",
            "orderenddate": "02-09-2023",
            "idclient": 3,
            "clientname": "jfz",
            "idteam": 2,
            "teamname": "team222"
        },
        {
            "value": 5,
            "label": "Web-Scraping Optimization",
            "orderstatus": "Pending",
            "orderstartdate": "19-05-2023",
            "orderenddate": "20-05-2023",
            "idclient": 3,
            "clientname": "jfz",
            "idteam": 3,
            "teamname": "team435"
        },
        {
            "value": 3,
            "label": "Donations for vulnerated individuals",
            "orderstatus": "Rejected",
            "orderstartdate": "13-05-2023",
            "orderenddate": "17-06-2023",
            "idclient": 2,
            "clientname": "afared",
            "idteam": 3,
            "teamname": "team435"
        },
        {
            "value": 9,
            "label": "The Dobl Website",
            "orderstatus": "Approved",
            "orderstartdate": "08-06-2023",
            "orderenddate": "03-11-2023",
            "idclient": 16,
            "clientname": "Test Andres",
            "idteam": 7,
            "teamname": "Team Test 3"
        },
        {
            "value": 10,
            "label": "Test Generate Save",
            "orderstatus": "Approved",
            "orderstartdate": "08-06-2023",
            "orderenddate": "22-09-2023",
            "idclient": 16,
            "clientname": "Test Andres",
            "idteam": 6,
            "teamname": "Test Team 2"
        },
        {
            "value": 6,
            "label": "Crew Management Platform / Client Ordering System",
            "orderstatus": "Pending",
            "orderstartdate": "08-06-2023",
            "orderenddate": "17-06-2023",
            "idclient": 10,
            "clientname": "New Client GG",
            "idteam": 2,
            "teamname": "team222"
        }
    ]
}
*/

/*
SELECT 
      orders.id, 
      orders.name AS ordername, 
      orders.orderstatus, 
      to_char(orders.orderstartdate, 'DD-MM-YYYY') AS orderstartdate,
      to_char(orders.orderenddate, 'DD-MM-YYYY') AS orderenddate,
      client.name AS clientname, 
      teams.name AS teamname 
    FROM orders
    INNER JOIN client
        ON orders.idclient = client.id
    INNER JOIN teams
        ON orders.idteam = teams.id
    WHERE orders.erased = false;
*/

// "orderstatus": "\"Rejected\"",