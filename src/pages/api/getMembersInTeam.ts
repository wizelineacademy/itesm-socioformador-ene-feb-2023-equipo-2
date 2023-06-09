import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import teams from "../teams";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { selectedTeamID } = req.body;
  //const newSelectedTeamID = parseInt(selectedTeamID);
  try {

    /*const teamMembers = await prisma.$queryRaw`
      SELECT 
        CAST(teams.id AS VARCHAR) AS value,
        teams.name AS label,
        CAST(employees.id AS VARCHAR) AS employeeid, 
        employees.name AS employeename, 
        employees.location,  
        CAST(employees.idposition AS VARCHAR) AS idposition
      FROM employees
      INNER JOIN teamemployees
        ON employees.id = teamemployees.idemployee
      INNER JOIN teams
        ON teams.id = teamemployees.idteam
      WHERE teams.id = ${selectedTeamID}
      ORDER BY label ASC;
    `*/

    const teamMembers = await prisma.employees.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        idposition: true,
      },
      where: {
        teams: {
          some: {
            idteam: selectedTeamID,
          }
        }
      },
      orderBy: {
        id: 'asc',
      },
    });

    const team = await prisma.teams.findUnique({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: selectedTeamID,
      },
    });

    const teamMembers2 = teamMembers.map((member) => {
      return { 
        value: String(team?.id), 
        label: team?.name, 
        employeeid: String(member.id), 
        employeename: member.name, 
        location: member.location, 
        idposition: String(member.idposition)
      }
    });

    const response = {
      teamMembers: teamMembers2,
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
    "teamMembers": [
        {
            "value": "2",
            "label": "team222",
            "employeeid": "48699",
            "employeename": "Employee 6",
            "location": "New York City",
            "idposition": "1"
        },
        {
            "value": "2",
            "label": "team222",
            "employeeid": "38250",
            "employeename": "Employee 3",
            "location": "New York City",
            "idposition": "1"
        },
        {
            "value": "2",
            "label": "team222",
            "employeeid": "92426",
            "employeename": "Employee 4",
            "location": "New York City",
            "idposition": "1"
        }
    ]
}

{
    "teamMembers": [
        {
            "value": "2",
            "label": "team222",
            "employeeid": "92426",
            "employeename": "Employee 4",
            "location": "New York City",
            "idposition": "1"
        },
        {
            "value": "2",
            "label": "team222",
            "employeeid": "38250",
            "employeename": "Employee 3",
            "location": "New York City",
            "idposition": "1"
        },
        {
            "value": "2",
            "label": "team222",
            "employeeid": "48699",
            "employeename": "Employee 6",
            "location": "New York City",
            "idposition": "1"
        }
    ]
}
*/