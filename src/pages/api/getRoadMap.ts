import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { userId } = req.body;

  try {
      const userRoadMap = await prisma.employees.findUnique({
        where: {
          id: userId,
        },
        select:{
          inforoadmap: true
      }
      });

    res.status(201).json({userRoadMap});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Roadmap info fetch not correct" });
  } finally {
    await prisma.$disconnect();
  }
}
