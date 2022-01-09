import { GetServerSideProps, NextPage } from "next";
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
            <a href="/game/new">New Game</a>
        </div>
    )
}

export default GameHome;