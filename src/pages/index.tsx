import React, { useEffect } from 'react';
import styles from './index.module.css';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { SignIn, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

import { api } from '~/utils/api';

const Home: NextPage = () => {
  const user = useUser();

  const hello = api.example.hello.useQuery({ text: 'from tRPC' });

  useEffect(() => {
    // Update the class name of the body element based on the desired mode
    document.body.className = true ? 'light-mode' : 'dark-mode';
  }, []);

  return (
    <>
      <Head>
        <title>Prompterly</title>
        <meta
          name="description"
          content="Allowing you to reuse, share, and discover prompts to power up your AI productivity"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0369a1" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#e0f2fe" />
      </Head>
      <main>
        <div>
          {user.isLoaded && <h1>Hello {user.user?.username}</h1>}
          {user.isLoaded && <p>{JSON.stringify(user)}</p>}
          {!user.isSignedIn && <SignInButton />}
          {user.isSignedIn && <SignOutButton />}
        </div>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </main>
    </>
  );
};

export default Home;
