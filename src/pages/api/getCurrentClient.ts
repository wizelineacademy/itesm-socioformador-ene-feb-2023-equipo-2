import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const clientID = parseInt(id);

  try {
    const client = await prisma.client.findUnique({
      where: {
        id: clientID,
      },
    });
    
    return res.status(201).json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}
