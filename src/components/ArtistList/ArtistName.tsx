import { FC } from "react";
import { useArtist } from "./artistContext";

export const ArtistName: FC = () => {
    const artist = useArtist();

    if (!artist) return null;

    return <p>{artist.name}</p>;
};
