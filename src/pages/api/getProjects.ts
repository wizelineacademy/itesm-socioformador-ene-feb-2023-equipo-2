import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {
    const orders = await prisma.orders.findMany();
    const projectSelectList = orders.map((project) => {
      return { value: project.id, label: project.name}
    });
    const response = {
      orders: projectSelectList,
    };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}
