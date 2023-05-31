import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    const { id } = req.body;

  try {
    const user = await prisma.employees.findUnique({
        where: {
            id: id,
        },
        select:{
            infoabout: true
        }
    })
   
    res.status(200).json(user);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "An error occurred fetching user info." });
  } finally {
    await prisma.$disconnect();
  }
}