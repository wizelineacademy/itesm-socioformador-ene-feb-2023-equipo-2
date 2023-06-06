import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {

    const teamEmployees = await prisma.$queryRaw`
    SELECT 
      CAST(employees.id AS VARCHAR) AS id, 
      employees.name AS employeename, 
      employees.location,  
      CAST(employees.idposition AS VARCHAR) AS idposition, 
      employees.email AS email,
      employees.linkedinlink AS linkedinlink,
      CAST(teams.id AS VARCHAR) AS idteam,
      teams.name AS teamname,
	    CAST(orders.id AS VARCHAR) AS idproject
    FROM employees
    INNER JOIN teamemployees
        ON employees.id = teamemployees.idemployee
    INNER JOIN teams
        ON teamemployees.idteam = teams.id
    INNER JOIN orders
        ON teams.id = orders.idteam
    `
    const response = {
      teamEmployees: teamEmployees,
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
SELECT 
      orders.id, 
      orders.name AS ordername, 
      orders.orderstatus,  
      client.name AS clientname, 
      client.email,
      client.phone,
      teams.name AS teamname,
      to_char(orders.orderstartdate, 'DD-MM-YYYY') AS orderstartdate,
      to_char(orders.orderenddate, 'DD-MM-YYYY') AS orderenddate,
      orders.orderdesc
    FROM orders
    INNER JOIN client
        ON orders.idclient = client.id
    INNER JOIN teams
        ON orders.idteam = teams.id
    WHERE orders.erased = false;
*/