import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/router";


export default function Login() {
  const router = useRouter();

    const { user, error, isLoading } = useUser();

    return (user === undefined) ? router.push("/api/auth/login")  : console.log("chtm andres")
  }