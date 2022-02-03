import cn from "classnames";
import { FC } from "react";
import { useCurrentRound, useGameContext } from "./gameContext";

interface GameAlbumArtworkProps {}

export const AlbumArtwork: FC<GameAlbumArtworkProps> = () => {
    const { playing } = useGameContext();
    const { track } = useCurrentRound();

    return (
        <div className="w-full pl-3 pr-3 md:p-0 flex justify-center max-w-[360px]">
            <img
                className={cn(
                    "w-full rounded-lg reveal-animation image-reveal",
                    {
                        play: playing,
                    }
                )}
                src={track.albumArtwork}
                alt="album artwork slowly revealing itself"
            />
        </div>
    );
};
