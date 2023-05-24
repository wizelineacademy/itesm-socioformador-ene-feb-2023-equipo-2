import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name } = req.body;
  const teamID = parseInt(id);

  try {
    const teamUpdate = await prisma.teams.update({
      where: {
        id: teamID,
      },
      data: {
        name: name,
      }
    });
    return res.status(200).json({ message: "Updated team correctly" })
  } catch (error) {
    return res.status(500).json({ message: "An error occurred." })
  } finally {
    await prisma.$disconnect();
  }
}