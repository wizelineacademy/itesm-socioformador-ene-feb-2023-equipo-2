import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//const id = 1

export default async function handler(req: any, res: any) {
  const { inforoadmap, infoabout, userId } = req.body;
  const inforoadmap_string = JSON.stringify(inforoadmap).replace((/  |\r\n|\n|\r/gm),"");
  const infoabout_string = JSON.stringify(infoabout);

  //TODO: ID FIJO PROVISIONAL MIENTRAS IMPLEMENTAMOS AUTH0
  console.log("userId => ", userId)

  try {
    const record = await prisma.employees.findUnique({ where: { id: userId } });
    if (!record) {
      throw new Error(`Record with ID ${userId} not found`);
    }

    const updatedRecord = await prisma.employees.update({
      where: { id: userId },
      data: { inforoadmap: inforoadmap_string, infoabout: infoabout_string },
    });

    res.status(201).json("Roadmap info saved correctly");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Roadmap info not saved correctly" });
  } finally {
    await prisma.$disconnect();
  }
}
