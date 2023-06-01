import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0/client';

const settings = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    // Redirect logic here
    if (isLoading) {
      undefined
    } else {
      if (!user) {
        router.push("/");
      }
    }
  }, [isLoading]);

  return (
    user === undefined ? <div>
      <h1>Loading...</h1>
    </div>
      :
      <div>settings</div>
  )
}

export default settings