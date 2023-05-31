import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {

    const orders = await prisma.$queryRaw`
      SELECT 
        CAST(orders.id AS VARCHAR) AS id, 
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
    `
    const response = {
      orders: orders,
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

// "orderstatus": "\"Rejected\"",