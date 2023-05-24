import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const teamID = parseInt(id);

  try {
    const team = await prisma.teams.findUnique({
      where: {
        id: teamID,
      },
    });
    
    return res.status(201).json(team);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}
