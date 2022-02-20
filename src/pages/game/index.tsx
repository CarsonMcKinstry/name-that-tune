import { NextPage } from "next";
import Link from "next/link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { ProgressBar } from "@components/GameBoard/ProgressBar";
import { AlbumArtwork } from "@components/GameBoard/AlbumArtwork";

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
            <Link href="/game/new">New Game</Link>
            <ProgressBar playing />
            <AlbumArtwork
                playing
                url="https://source.unsplash.com/random/300×300"
            />
        </div>
    );
};

export default GameHome;
