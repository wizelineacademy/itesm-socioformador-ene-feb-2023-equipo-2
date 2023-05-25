import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  const { teamName, teamMembers } = req.body;

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
    const newTeam = await prisma.teams.create({
      data: {
        name: teamName,  
        employees: {
          create: selectedValues
        },
      },
      include: {
        employees: true,
      }
    });

    console.log('teamName', teamName)
    console.log('setSelectedEmployees', selectedValues)

    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}