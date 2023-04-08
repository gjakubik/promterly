import React, { useContext } from 'react';
import Head from 'next/head';
import { PrivateUserContext } from '~/auth';
import Layout from '~/layout/Layout';

const Home = () => {
    const { userData } = useContext(PrivateUserContext);

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
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#0369a1"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#e0f2fe" />
            </Head>

            <Layout>
                {userData && <img src={userData.clerkProfilePicture}></img>}
            </Layout>
        </>
    );
};

export default Home;
