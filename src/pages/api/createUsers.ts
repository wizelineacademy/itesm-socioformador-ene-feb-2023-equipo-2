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
          linkedinlink: 'https://www.linkedin.com/in/john-smith',
          cvfile: 'resume.pdf',
          profileimage: 'profile.jpg',
          inforoadmap: '"{\"Roadmap\": [\n    {\n        \"name\": \"Rust\",\n        \"description\": \"A safe and concurrent programming language that emphasizes efficiency and performance.\",\n        \"previous_knowledge\": \"Knowledge of C++ would be helpful.\",\n        \"resources\": \"https://www.rust-lang.org/learn, \\\"Programming Rust\\\" book by Jim Blandy and Jason Orendorff\"\n    },\n    {\n        \"name\": \"Kubernetes\",\n        \"description\": \"An open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.\",\n        \"previous_knowledge\": \"Familiarity with Docker and basic networking concepts would be useful.\",\n        \"resources\": \"https://kubernetes.io/docs/home/, \\\"Kubernetes: Up and Running\\\" book by Brendan Burns, Joe Beda, and Kelsey Hightower\"\n    },\n    {\n        \"name\": \"React\",\n        \"description\": \"A JavaScript library for building user interfaces that is declarative, efficient, and flexible.\",\n        \"previous_knowledge\": \"Knowledge of JavaScript and HTML/CSS is required.\",\n        \"resources\": \"https://reactjs.org/docs/getting-started.html, \\\"React: Up & Running\\\" book by Stoyan Stefanov\"\n    },\n    {\n        \"name\": \"Scala\",\n        \"description\": \"A functional programming language that runs on the JVM and is designed to address some of the shortcomings of Java.\",\n        \"previous_knowledge\": \"Knowledge of Java would be helpful.\",\n        \"resources\": \"https://www.scala-lang.org/documentation/, \\\"Scala for the Impatient\\\" book by Cay S. Horstmann\"\n    },\n    {\n        \"name\": \"Spark\",\n        \"description\": \"An open-source distributed computing system that is designed to process large datasets in parallel.\",\n        \"previous_knowledge\": \"Familiarity with Hadoop and basic programming concepts would be useful.\",\n        \"resources\": \"https://spark.apache.org/docs/latest/, \\\"Learning Spark\\\" book by Holden Karau, Andy Konwinski, Patrick Wendell, and Matei Zaharia\"\n    }\n]}"',
          idposition: 1,
          email: email,
          password: 'password123',
          location: 'New York City',
          infoabout: '"{\n    \"name\": \"Gerardo Mora Beltrán\",\n    \"position\": \"Incoming SWE Intern @ Uber Summer ‘23 | Computer Science and Technology Undergraduate at Tecnológico de Monterrey\",\n    \"location\": \"Los Mochis, Sinaloa, México\",\n    \"Experience\": [\n        {\n            \"job_title\": \"Software Engineer Intern\",\n            \"job_company\": \"Uber\",\n            \"job_duration\": \"3 months\",\n            \"job_location\": \"Seattle, Washington, United States\"\n        }\n    ],\n    \"Skills\": [\n        \"C++\",\n        \"Go (Programming Language)\",\n        \"Git\",\n        \"C (Programming Language)\",\n        \"C#\",\n        \"Python (Programming Language)\",\n        \"SQL\",\n        \"Analytical Skills\"\n    ]\n}"',
          status: true
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