import { FC } from "react";
import { useArtist } from "./artistContext";
import styles from "./artistList.module.scss";

export const ArtistPortrait: FC = () => {
    const artist = useArtist();

    if (!artist) return null;

    const { image, name } = artist;

    return <img src={image.url} alt={name} className={styles.artistPortrait} />;
};
