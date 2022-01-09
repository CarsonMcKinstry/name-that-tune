// import { getAuthPropsFromContext } from "@packages/spotify/auth/getAuthProps";
// import { AuthProps, AuthProvider } from "@packages/spotify";
import { GetServerSideProps, NextPage } from "next";

// type GameHomeProps = AuthProps & {

// }

import { SPOTIFY_ACCESS_TOKEN_COOKIE } from '@packages/spotify';
import { parseCookies } from 'nookies';
import gql from 'graphql-tag';
import { useQuery } from "@apollo/client";

const getMe = gql`
    query Me {
        me {
            id
            display_name
        }
    }
`;

const GameHome: NextPage = () => {
    const { data, loading } = useQuery(getMe);

    return (
        <div>
            <a href="/api/logout">Logout</a>
            {loading && <p>Loading...</p>}
            {!loading && <p>Hello, {data.me.display_name}</p>}
        </div>
    )
}

export default GameHome;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = parseCookies(context);

    if (!cookies[SPOTIFY_ACCESS_TOKEN_COOKIE]) {
        return {
            redirect: {
                destination: '/api/refresh?redirect=game',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}