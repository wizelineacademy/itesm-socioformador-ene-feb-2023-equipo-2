import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Auth0Provider } from "@auth0/auth0-react";


export default function App({ Component, pageProps }: AppProps) {
  return(
    <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
  );
}
