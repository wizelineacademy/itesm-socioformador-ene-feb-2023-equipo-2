import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const {id} = req.body;
  const projectID = parseInt(id);
  //const projectID = 1;

  try {
    const project = await prisma.orders.findUnique({ where: { id: projectID } });
    const projectSelectList = 
      {value: project?.id,
      label: project?.name,
      orderstatus: project?.orderstatus,
      orderdesc: project?.orderdesc,
      idclient: project?.idclient,
      idteam: project?.idteam,
      orderstartdate: project?.orderstartdate.toString(),
      orderenddate: project?.orderenddate.toString(),
      erased: project?.erased}

    const response = {
      orders: projectSelectList,
    };
    res.status(201).json(response);

    console.log(projectSelectList.orderstartdate)

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}
