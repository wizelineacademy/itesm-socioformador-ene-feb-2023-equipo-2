import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  const { inforoadmap } = req.body;
  const inforoadmap_string = JSON.stringify(inforoadmap);

  //TODO: ID FIJO PROVISIONAL MIENTRAS IMPLEMENTAMOS AUTH0
  const id = 13

  try {

    const updatedRecord = await prisma.$transaction(async (prisma) => {
        const record = await prisma.employees.findUnique({ where: { id: id } });
        if (!record) {
          throw new Error(`Record with ID ${id} not found`);
        }
    
        const updatedRecord = await prisma.employees.update({
          where: { id },
          data: {inforoadmap: inforoadmap_string},
        });
    
        return updatedRecord;
      });


    res.status(201).json("Roadmap info saved correctly" );
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Roadmap info not saved correctly" });
  } finally {
    await prisma.$disconnect();
  }
}