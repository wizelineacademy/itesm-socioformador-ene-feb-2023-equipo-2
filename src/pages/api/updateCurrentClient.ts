import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, email, phone, erased } = req.body;
  const clientID = parseInt(id);

  try {
    const clientUpdate = await prisma.client.update({
      where: {
        id: clientID,
      },
      data: {
        name: name,
        email: email,
        phone: phone,
        erased: erased
      }
    });
    return res.status(200).json({ message: "Updated client correctly" })
  } catch (error) {
    return res.status(500).json({ message: "An error occurred." })
  } finally {
    await prisma.$disconnect();
  }
}