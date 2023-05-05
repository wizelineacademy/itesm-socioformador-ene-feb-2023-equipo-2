import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {
    const departments = await prisma.department.findMany();
    const departmentData = departments.map((department) => {
      return { value: department.id, label: department.name };
    });
    const response = {
      departments: departmentData,
    };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}