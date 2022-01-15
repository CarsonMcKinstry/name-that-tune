import { TopTracks } from "components/Selection";
import { NextPage } from "next";

const NewGame: NextPage = () => {
    return (
        <div>
            <h2>New Game</h2>
            <TopTracks />
        </div>
    );
};

export default NewGame;
