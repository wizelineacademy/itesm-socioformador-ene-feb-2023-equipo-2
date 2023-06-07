import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, newStatus } = req.body;
  const teamID = parseInt(id);
  // @ts-ignore
 /* const selectedValues = teamMembers.map((employee) => {
    return {
      employee: {
        connect: {
          id: parseInt(employee),
        }
      }
    }
  });*/
  console.log('newStatus', newStatus)
  try {
    const teamUpdate = await prisma.teams.update({
      where: {
        id: teamID,
      },
      data: {
        // @ts-ignore
        isactive: newStatus,
      }
    });

    /*const teamMembersUpdate = prisma.teamemployees.updateMany({
      where: {
        idteam: teamID,
      },
      data: {
        // @ts-ignore
        isactivemember: true,
      },
    });*/
    
    return res.status(200).json({ message: "Updated team correctly" })
  } catch (error) {
    return res.status(500).json({ message: "An error occurred." })
  } finally {
    await prisma.$disconnect();
  }
}