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
/*
    const teamEmployees = await prisma.employees.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        idposition: true,
        email: true,
        linkedinlink: true,
        teams: {
          select: {
            team: {
              select: {
                id: true,
                name: true,
                orders: {
                  select: {
                    id: true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        id: 'asc',
      },
    });

    const teamEmployees44 = await prisma.teamemployees.findMany({
      select: {
        idteam: true,
        idemployee: true,
        employee: {
          select: {
            id: true,
            name: true,
            location: true,
            idposition: true,
            email: true,
            linkedinlink: true,
          }
        },
        team: {
          select: {
            id: true,
            name: true,
          }
        },
      },
      where: {
        team: {
          orders: {
            some: {
              id: projectID,
            }
          },
        }
      },
      orderBy: {
        idemployee: 'asc',
      },
    });

    const teamEmployees2 = teamEmployees.map((project) => {
      return { 
        id: String(project.id), 
        ordername: project.name, 
        location: project.location, 
        idposition: project.idposition,
        email: project.email,
        linkedinlink: project.linkedinlink,
      }
    });

    const teamEmployees222 = teamEmployees44.map((projectH) => {
      return { 
        id: projectH.employee.id, 
        employeename: projectH.employee.name, 
        location: projectH.employee.location,  
        idposition: projectH.employee.idposition, 
        email: projectH.employee.email,
        linkedinlink: projectH.employee.linkedinlink,
        idteam: projectH.team.id,
        teamname: projectH.team.name,
        idproject: projectID
      }
    });*/

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