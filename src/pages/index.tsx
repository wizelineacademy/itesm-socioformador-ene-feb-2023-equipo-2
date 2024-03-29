import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import Image from "next/image";
import transLogo from "src/images/transLogo.jpg";
import bg from "src/images/wbg.webp";
import { useUser } from '@auth0/nextjs-auth0/client';
import { getAuth0Id } from '../utils/getAuth0Id'

export default function Home() {
  const router = useRouter();

  const { user, error, isLoading } = useUser();

  console.log('user', user)

  useEffect(() => {
    // Redirect logic here
    if (user) {
      router.push("/generar-perfil");
    } else {
      if (isLoading) {
        undefined
      } else {
        router.push("/api/auth/login");
      }
    }

  }, [isLoading]);

  return (
    // Login form layout

    <div className="bg-light d-flex justify-content-center align-items-center vh-100 position-relative">
      <div className={`position-absolute w-100 h-100`}>
        <Image
          src={bg}
          alt="Wizeline Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          loading="eager"
          placeholder="blur"
          style={{ filter: "blur(10px)" }}
        />
      </div>
      <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
        <Card style={{ width: "27rem" }}>
          <Card.Body>
            <div className="text-center pt-3 pb-4">
              <Image src={transLogo} alt="WizeLine Logo" height={100} />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
