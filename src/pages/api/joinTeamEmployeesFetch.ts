import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {

    const teamMembers = await prisma.$queryRaw`
    SELECT 
      CAST(employees.id AS VARCHAR) AS value, 
      employees.name AS employeename, 
      employees.location,  
      CAST(employees.idposition AS VARCHAR) AS idposition, 
      department.name AS departmentname,
      teams.name AS label,
	  CAST(orders.id AS VARCHAR) AS idproject,
      CAST(teams.id AS VARCHAR) AS idteam
    FROM employees
    INNER JOIN departmentemployees
        ON employees.id = departmentemployees.idemployee
    INNER JOIN department
        ON departmentemployees.iddepartment = department.id
    INNER JOIN teamemployees
        ON employees.id = teamemployees.idemployee
    INNER JOIN teams
        ON teamemployees.idteam = teams.id
    INNER JOIN orders
          ON teams.id = orders.id
    `
    const response = {
      teamMembers: teamMembers,
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