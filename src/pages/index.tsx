import { SPOTIFY_ACCESS_TOKEN_COOKIE } from "@packages/spotify";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return <Link href="/api/login">Login</Link>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { cookies } = context.req;

    const { [SPOTIFY_ACCESS_TOKEN_COOKIE]: accessToken } = cookies;

    if (accessToken) {
        return {
            redirect: {
                destination: "/game",
                permanent: false,
            },
            props: {},
        };
    }

    return {
        props: {},
    };
};
