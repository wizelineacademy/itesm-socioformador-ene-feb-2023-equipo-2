import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, position } = req.body;
    const _id = parseInt(id);

    try {
        const employeeUpdate = await prisma.employees.update({
            where: {
                id: _id,
            },
            data: {
                name: name,
                position: position
            }
        });
        return res.status(200).json({ message: "Updated employee correctly." })
    } catch (error) {
        return res.status(500).json({ message: "An error occurred on employee updating." })
    } finally {
        await prisma.$disconnect();
    }
}