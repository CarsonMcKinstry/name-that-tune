import { FC } from "react";
import { useArtist } from "./artistContext";
import styles from "./artistList.module.scss";

export const ArtistName: FC = () => {
    const artist = useArtist();

    if (!artist) return null;

    return <p className={styles.artistName}>{artist.name}</p>;
};
