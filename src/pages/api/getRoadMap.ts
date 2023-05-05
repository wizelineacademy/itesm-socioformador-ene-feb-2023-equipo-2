import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { inforoadmap } = req.body;
  const inforoadmap_string = JSON.stringify(inforoadmap);

  //TODO: ID FIJO PROVISIONAL MIENTRAS IMPLEMENTAMOS AUTH0
  const id = 13;

  try {
      const userRoadMap = await prisma.employees.findUnique({
        where: {
          id: 13,
        },
      })

    res.status(201).json({userRoadMap});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Roadmap info fetch not correct" });
  } finally {
    await prisma.$disconnect();
  }
}