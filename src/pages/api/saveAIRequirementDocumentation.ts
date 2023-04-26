import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  const { aidescription } = req.body;
  const aidescription_string = JSON.stringify(aidescription);
  //TODO: ID FIJO PROVISIONAL MIENTRAS IMPLEMENTAMOS AUTH0
  const id = 1

  try {

    const updatedRecord = await prisma.$transaction(async (prisma) => {
        const record = await prisma.orders.findUnique({ where: { id: id } });
        if (!record) {
          throw new Error(`Record with ID ${id} not found`);
        }
    
        const updatedRecord = await prisma.orders.update({
          where: { id },
          data: {orderdesc: aidescription_string},
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