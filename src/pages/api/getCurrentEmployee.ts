import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const employeeID = parseInt(id);

  try {
    const employee = await prisma.employees.findUnique({
      where: {
        id: employeeID,
      },
    });
    
    return res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}
