import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { selectedTeamID } = req.body;
  //const newSelectedTeamID = parseInt(selectedTeamID);
  try {

    const teamMembers = await prisma.$queryRaw`
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