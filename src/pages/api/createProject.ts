import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
    const { aidescription, orderstatus, orderstartdate, orderenddate, idteam, idclient, name} = req.body;

    const aidescription_string = JSON.stringify(aidescription);
    const orderstatus_string = orderstatus;
    const orderstartdate_datetime = new Date(JSON.stringify(orderstartdate));
    const orderenddate_datetime = new Date(JSON.stringify(orderenddate));
    const idteam_int = parseInt(JSON.stringify(idteam));
    const idclient_int = parseInt(JSON.stringify(idclient));
    const name_string = name;
    
    console.log(req.body)

  try {
    const newProject = await prisma.orders.create({
      data: {
        name: name_string,
        orderdesc: aidescription_string, 
        orderstatus: orderstatus_string, 
        orderstartdate: orderstartdate_datetime,
        orderenddate: orderenddate_datetime,
        idteam: idteam_int,
        idclient: idclient_int,
        erased: false},
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}