import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, idposition,email, password, status } = req.body;
  const employeeID = parseInt(id);

  try {
    const employeeUpdate = await prisma.employees.update({
      where: {
        id: employeeID,
      },
      data: {
        name: name,
        idposition: idposition,
        email: email,
        password: password,
        status: status
      }
    });
    return res.status(200).json({ message: "Updated client correctly." })
  } catch (error) {
    return res.status(500).json({ message: "An error occurred." })
  } finally {
    await prisma.$disconnect();
  }
}