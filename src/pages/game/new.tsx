import { TopTracks, TopArtists } from "components/Selection";
import { NextPage } from "next";

const NewGame: NextPage = () => {
    return (
        <div>
            <h2>New Game</h2>
            <TopArtists onSelect={(id) => console.log(id)} />
        </div>
    );
};

export default NewGame;
