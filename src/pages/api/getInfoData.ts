import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {

  //TODO: ID FIJO PROVISIONAL MIENTRAS IMPLEMENTAMOS AUTH0
  const id = 1

  try {
    const employee14InfoAbout = await prisma.employees.findUnique({
        where: { id },
        select: { infoabout: true },
      })
      
    const parsedEmployee14InfoAbout = JSON.parse(employee14InfoAbout.infoabout)

    res.status(201).json(parsedEmployee14InfoAbout);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Information retrieval failed" });
  } finally {
    await prisma.$disconnect();
  }
}