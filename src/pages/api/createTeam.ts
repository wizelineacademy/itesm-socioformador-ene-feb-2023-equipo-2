import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  const { teamName, teamMembers } = req.body;
  // @ts-ignore
  const selectedValues = teamMembers.map((employee) => {
    return {
      employee: {
        connect: {
          id: parseInt(employee),
        },
      },
      isactivemember: true,
    }
  });
//sdfsd
  try {
    const newTeam = await prisma.teams.create({
      data: {
        name: teamName,  
        employees: {
          create: selectedValues,
        },
        // @ts-ignore
        isactive: true,
      },
      include: {
        employees: true,
      }
    });

    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}