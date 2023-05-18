import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {  
    try {
        const teams = await prisma.teams.findMany();
        const teamData = teams.map((team) => {
            return {value: team.id, label: team.name}
        });

        const response = {
            teams: teamData
        };

        console.log(JSON.stringify(response));
        res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "An error occurred."})
  } finally {
    await prisma.$disconnect();
  }
}