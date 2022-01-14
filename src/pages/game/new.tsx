import {
    SearchArtists,
    SearchTracks,
    TopArtists,
    TopTracks,
} from "components/Selection";
import { NextPage } from "next";

const NewGame: NextPage = () => {
    return (
        <div>
            <h2>New Game</h2>
            {/* <TopTracks /> */}
            <TopArtists
                onSelect={(id) => {
                    console.log(id);
                }}
            />
            {/* 
            
            <SearchArtists />
            <SearchTracks /> */}
        </div>
    );
};

export default NewGame;
