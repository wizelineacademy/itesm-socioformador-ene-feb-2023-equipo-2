import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, teamMembers } = req.body;
  const teamID = parseInt(id);
  // @ts-ignore
  const selectedValues = teamMembers.map((employee) => {
    return {
      employee: {
        connect: {
          id: parseInt(employee),
        }
      }
    }
  });

  try {
    const teamUpdate = await prisma.teams.update({
      where: {
        id: teamID,
      },
      data: {
        name: name,
        employees: {
          create: selectedValues
        },
      }
    });
    return res.status(200).json({ message: "Updated team correctly" })
  } catch (error) {
    return res.status(500).json({ message: "An error occurred." })
  } finally {
    await prisma.$disconnect();
  }
}