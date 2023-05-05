import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {
    const employees = await prisma.employees.findMany();
    const employeeData = employees.map((employee) => {
      return { value: employee.id, label: employee.name };
    });
    const response = {
      employees: employeeData,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}