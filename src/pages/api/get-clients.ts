import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {
    const client = await prisma.client.findMany();

    const clientSelectList = client.map((client) => {
      return { value: client.id, label: client.name, email: client.email, phone: client.phone, erased: String(client.erased)}
    });

    const response = {
        client: clientSelectList,
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