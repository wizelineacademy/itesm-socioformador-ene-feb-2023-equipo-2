import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  const { aidescription, orderstatus, orderstartdate, orderenddate, idteam, idclient, name, id} = req.body;
  const aidescription_string = aidescription;
  const orderstatus_string = orderstatus;
  const orderstartdate_datetime = new Date(JSON.stringify(orderstartdate));
  const orderenddate_datetime = new Date(JSON.stringify(orderenddate));
  const idteam_int = parseInt(JSON.stringify(idteam));
  const idclient_int = parseInt(JSON.stringify(idclient));
  const name_string = name;
  const projectID = parseInt(id);
/*
  console.log(aidescription_string)
  console.log(orderstatus_string)
  console.log(orderstartdate_datetime)
  console.log(orderenddate_datetime)
  console.log(idteam_int)
  console.log(idclient_int)
  console.log(name_string)
  console.log(projectID);*/

  //TODO: ID FIJO PROVISIONAL MIENTRAS IMPLEMENTAMOS AUTH0
  //const id = 1

  try {
   // console.log('\n\n\n\n' + typeof(projectID));
    const updatedRecord = await prisma.$transaction(async (prisma) => {
        const record = await prisma.orders.findUnique({ where: { id: projectID } });
        if (!record) {
          throw new Error(`Record with ID ${projectID} not found`);
        }
        
        const updatedRecord = await prisma.orders.update({
          where: { id: projectID },
          data: {orderdesc: aidescription_string, 
                 orderstatus: orderstatus_string, 
                 orderstartdate: orderstartdate_datetime,
                 orderenddate: orderenddate_datetime,
                 idteam: idteam_int,
                 idclient: idclient_int,
                 name: name_string},
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