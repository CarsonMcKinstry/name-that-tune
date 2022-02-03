import { AlbumArtwork } from "./AlbumArtwork";
import { defaultGameContext, gameContext } from "./gameContext";
import { Header } from "./Header";
import { Round } from "./Round";
import { TrackOptions } from "./TrackOptions";

const { Provider: GameContextProvider } = gameContext;

export const GameBoard = () => {
    return (
        <GameContextProvider value={defaultGameContext}>
            <div className="w-full h-full flex flex-col">
                <Header onQuit={() => console.log("quit")} />
                <Round>
                    <AlbumArtwork />
                    <TrackOptions onSelect={(id) => console.log(id)} />
                </Round>
            </div>
        </GameContextProvider>
    );
};
