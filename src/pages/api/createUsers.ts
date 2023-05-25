import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function generateRandomPassword(): string {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }

  function generateRandomUserId(): number {
    const characters = "0123456789";
    let userId = "";
    for (let i = 0; i < 5; i++) {
      userId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    let userIdInt = +userId
    return userIdInt;
}

export default async function handler(req: any, res: any) {
  const { email, userId } = req.body;
  const email_string = JSON.stringify(email);

  //TODO: ID FIJO PROVISIONAL MIENTRAS IMPLEMENTAMOS AUTH0
  const id = 13


  try {

    //sending petition to auth0 api to generate a new user    
      const newUser = await prisma.employees.create({
        // @ts-ignore
        data: {
          id: userId,
          name: "nametestqithAuth0",  
          linkedinlink: '',
          cvfile: '',
          profileimage: '',
          inforoadmap: '',
          idposition: 1,
          email: email,
          password: ''
        },
      });
  


    res.status(201).json("Usuario creado correctamente en bd");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al crear usuario en bd" });
  } finally {
    await prisma.$disconnect();
  }
}