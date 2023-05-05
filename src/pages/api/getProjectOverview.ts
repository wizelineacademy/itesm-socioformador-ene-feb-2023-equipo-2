import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {
    const orders = await prisma.orders.findMany({
      select: {
        id: true,
        name: true,
        orderstatus: true,
        orderstartdate: true,
        orderenddate: true,
        erased: true,
        idclient: true,
        idteam: true,
      },
    });
    const response = {
      orders: orders,
    };
    console.log(JSON.stringify(response));
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}
