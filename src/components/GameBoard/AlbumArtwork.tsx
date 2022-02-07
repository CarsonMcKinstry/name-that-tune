import cn from "classnames";
import { FC } from "react";

interface GameAlbumArtworkProps {
    onLoad: () => void;
    playing: boolean;
    url: string;
}

export const AlbumArtwork: FC<GameAlbumArtworkProps> = ({
    onLoad,
    playing,
    url,
}) => {
    return (
        <div className="w-full pl-3 pr-3 md:p-0 flex justify-center max-w-[340px]">
            <img
                onLoad={onLoad}
                className={cn(
                    "w-full rounded-lg reveal-animation image-reveal",
                    {
                        play: playing,
                    }
                )}
                src={url}
                alt="album artwork slowly revealing itself"
            />
        </div>
    );
};
