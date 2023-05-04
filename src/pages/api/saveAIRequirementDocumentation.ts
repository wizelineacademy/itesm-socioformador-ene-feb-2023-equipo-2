import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  const { aidescription, orderstatus, orderstartdate, orderenddate, idteam} = req.body;
  const aidescription_string = JSON.stringify(aidescription);
  const orderstatus_string = JSON.stringify(orderstatus);
  const orderstartdate_datetime = new Date(JSON.stringify(orderstartdate));
  const orderenddate_datetime = new Date(JSON.stringify(orderenddate));
  const idteam_int = parseInt(JSON.stringify(idteam));

  console.log(aidescription_string)
  console.log(orderstatus_string)
  console.log(orderstartdate_datetime)
  console.log(orderenddate_datetime)
  console.log(idteam_int)

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
          data: {orderdesc: aidescription_string, 
                 orderstatus: orderstatus_string, 
                 orderstartdate: orderstartdate_datetime,
                 orderenddate: orderenddate_datetime,
                 idteam: idteam_int},
        });
    
        return updatedRecord;
      });


    res.status(201).json("Requirement documentation saved correctly" );
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Requirement documentation not saved correctly" });
  } finally {
    await prisma.$disconnect();
    }
}