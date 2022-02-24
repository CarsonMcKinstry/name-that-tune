import { NextPage } from "next";
import Link from "next/link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Questions } from "@components/Questions";

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
            <Link href="/api/logout">Logout</Link>
            {loading && <p>Loading...</p>}
            {!loading && <p>Hello, {data.me.display_name}</p>}
            <Questions />
        </div>
    );
};

export default GameHome;
