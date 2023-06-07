import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { memberId, teamId, newStatus } = req.body;
  const memberID = parseInt(memberId);
  const teamID = parseInt(teamId);

  try {
    const teamMemberUpdate = await prisma.teamemployees.update({
      where: {
        idteam_idemployee: {
          idemployee: memberID,
          idteam: teamID,
        },
      },
      data: {
        // @ts-ignore
        isactivemember: newStatus,
      }
    });
    
    return res.status(200).json({ message: "Updated team correctly" })
  } catch (error) {
    return res.status(500).json({ message: "An error occurred." })
  } finally {
    await prisma.$disconnect();
  }
}