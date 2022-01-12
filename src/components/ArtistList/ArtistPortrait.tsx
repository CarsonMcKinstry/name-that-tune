import { FC } from "react";
import { useArtist } from "./artistContext";

export const ArtistPortrait: FC = () => {
    const artist = useArtist();

    if (!artist) return null;

    const { image, name } = artist;

    return <img src={image.url} alt={name} />;
};
