import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  try {
    const employees = await prisma.employees.findMany();
    const employeeData = employees.map((employee : any) => {
      return {value: employee.id,
              label: employee.name,
              linkedinlink: employee.linkedinlink,
              cvfile: employee.cvfile,
              profileimg: employee.profileimg,
              inforoadmap: employee.inforoadmap,
              idposition: parseInt(employee.idposition),
              email: employee.email,
              password: employee.password,
              location: employee.location,
              infoabout: employee.infoabout,
              status: String(employee.status)};
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