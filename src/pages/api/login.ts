import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  const { email, password } = req.body;

  try {
    const newUser = await prisma.employees.create({
      // @ts-ignore
      data: {
        name: "nametest",  
        linkedinlink: '',
        cvfile: '',
        profileimage: '',
        inforoadmap: '',
        idposition: 1,
        email: email,
        password: password
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