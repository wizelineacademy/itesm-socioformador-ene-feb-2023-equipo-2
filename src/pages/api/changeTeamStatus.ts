import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, newStatus } = req.body;
  const teamID = parseInt(id);
  console.log('id', id)
  console.log('newStatus', newStatus)
  console.log('teamID', teamID)
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
  try {
    const teamUpdate = await prisma.teams.update({
      where: {
        id: teamID,
      },
      data: {
        // @ts-ignore
        isactive: newStatus,
        employees: {
          updateMany: {
            where: {
              isactivemember: !newStatus,
            },
            data: {
              isactivemember: newStatus,
            }
          },
        },
      }
    });
    console.log('teamUpdate', teamUpdate)
    
    return res.status(200).json({ message: "Updated team correctly" })
  } catch (error) {
    return res.status(500).json({ message: "An error occurred." })
  } finally {
    await prisma.$disconnect();
  }
}