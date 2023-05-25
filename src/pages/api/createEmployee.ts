import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  const { name, email } = req.body;
  console.log(req.body)

  try {
    const newUser = await prisma.employees.create({
      // @ts-ignore
      data: {
        name: name,  
        linkedinlink: '',
        cvfile: '',
        profileimage: '',
        inforoadmap: '',
        idposition: 1,
        email: email,
        password: 'wizelineDefault'
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}