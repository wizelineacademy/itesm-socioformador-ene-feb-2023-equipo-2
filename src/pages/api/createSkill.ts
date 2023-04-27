import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { iddepartment, skillName } = req.body;

  try {
    const newUser = await prisma.skills.create({
      data: {
        name: skillName,
        iddepartment: iddepartment,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}
