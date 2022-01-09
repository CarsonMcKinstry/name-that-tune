import { TopArtists } from 'components/Selection';
import { NextPage } from 'next';

const NewGame: NextPage = () => {
    return (
        <div>
            <h2>New Game</h2>
            <TopArtists />
        </div>
    )
};

export default NewGame;