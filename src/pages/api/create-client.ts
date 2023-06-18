import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { name, email, phone } = req.body;

  try {
    const newClient = await prisma.client.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        erased: false
      }
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } 
  finally {
    await prisma.$disconnect();
  }
}
