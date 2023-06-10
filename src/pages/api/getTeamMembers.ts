import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    /*const teamMembers = await prisma.$queryRaw`
      SELECT 
        CAST(teams.id AS VARCHAR) AS value,
        teams.name AS label,
        CAST(employees.id AS VARCHAR) AS employeeid, 
        employees.name AS employeename, 
        employees.location, 
        teamemployees.isactivemember AS isactivemember,  
        CAST(employees.idposition AS VARCHAR) AS idposition
      FROM employees
      INNER JOIN teamemployees
        ON employees.id = teamemployees.idemployee
      INNER JOIN teams
        ON teams.id = teamemployees.idteam
      ORDER BY label ASC;
    `*/

    const teamEmployees44 = await prisma.teamemployees.findMany({
      select: {
        isactivemember: true,
        employee: {
          select: {
            id: true,
            name: true,
            location: true,
            idposition: true,
          }
        },
        team: {
          select: {
            id: true,
            name: true,
          }
        },
      },
      orderBy: {
        idteam: 'asc',
      },
    });

    const teamEmployees = teamEmployees44.map((projectH) => {
      return { 
        value: projectH.team.id,
        label: projectH.team.name, 
        employeeid: projectH.employee.id,
        employeename: projectH.employee.name,
        location: projectH.employee.location, 
        isactivemember: projectH.isactivemember,  
        idposition: projectH.employee.idposition,
      }
    });

    const response = {
      teamMembers: teamEmployees,
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
            "value": "8",
            "label": "dsgadg",
            "employeeid": "56049",
            "employeename": "Employee 2822",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "1",
            "label": "holajs",
            "employeeid": "45368",
            "employeename": "Employee 2",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "1",
            "label": "holajs",
            "employeeid": "92655",
            "employeename": "Employee 5",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "1",
            "label": "holajs",
            "employeeid": "88952",
            "employeename": "Employee 7",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "4",
            "label": "name test 1",
            "employeeid": "45368",
            "employeename": "Employee 2",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "4",
            "label": "name test 1",
            "employeeid": "92426",
            "employeename": "Employee 4",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "4",
            "label": "name test 1",
            "employeeid": "56049",
            "employeename": "Employee 2822",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "4",
            "label": "name test 1",
            "employeeid": "46974",
            "employeename": "adminadmin",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "4",
            "label": "name test 1",
            "employeeid": "25053",
            "employeename": "testModal",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "2"
        },
        {
            "value": "2",
            "label": "team222",
            "employeeid": "48699",
            "employeename": "Employee 6",
            "location": "New York City",
            "isactivemember": false,
            "idposition": "1"
        },
        {
            "value": "2",
            "label": "team222",
            "employeeid": "92426",
            "employeename": "Employee 4",
            "location": "New York City",
            "isactivemember": false,
            "idposition": "1"
        },
        {
            "value": "2",
            "label": "team222",
            "employeeid": "38250",
            "employeename": "Employee 3",
            "location": "New York City",
            "isactivemember": false,
            "idposition": "1"
        },
        {
            "value": "9",
            "label": "Team Tec",
            "employeeid": "55730",
            "employeename": "Jorge test",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "2"
        },
        {
            "value": "9",
            "label": "Team Tec",
            "employeeid": "2256",
            "employeename": "testAdmin2",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "2"
        },
        {
            "value": "7",
            "label": "Team Test 3",
            "employeeid": "84829",
            "employeename": "adminadmin",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "2"
        },
        {
            "value": "7",
            "label": "Team Test 3",
            "employeeid": "56049",
            "employeename": "Employee 2822",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "7",
            "label": "Team Test 3",
            "employeeid": "26731",
            "employeename": "Employee 26",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "7",
            "label": "Team Test 3",
            "employeeid": "4548",
            "employeename": "Employee 27",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "5",
            "label": "test Team 1",
            "employeeid": "48699",
            "employeename": "Employee 6",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "5",
            "label": "test Team 1",
            "employeeid": "88952",
            "employeename": "Employee 7",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "5",
            "label": "test Team 1",
            "employeeid": "66845",
            "employeename": "Employee 8",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "5",
            "label": "test Team 1",
            "employeeid": "32176",
            "employeename": "Employee 11",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "5",
            "label": "test Team 1",
            "employeeid": "98906",
            "employeename": "Employee 13",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "5",
            "label": "test Team 1",
            "employeeid": "85552",
            "employeename": "Employee 9",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "5",
            "label": "test Team 1",
            "employeeid": "20124",
            "employeename": "Employee 10",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "5",
            "label": "test Team 1",
            "employeeid": "92655",
            "employeename": "Employee 5",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "6",
            "label": "Test Team 2",
            "employeeid": "92426",
            "employeename": "Employee 4",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "6",
            "label": "Test Team 2",
            "employeeid": "65536",
            "employeename": "Employee 15",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        },
        {
            "value": "6",
            "label": "Test Team 2",
            "employeeid": "38492",
            "employeename": "Employee 17",
            "location": "New York City",
            "isactivemember": true,
            "idposition": "1"
        }
    ]
}
*/