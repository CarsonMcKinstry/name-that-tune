import { FC } from "react";
import { useTrack } from "./trackContext";
import styles from "./trackList.module.scss";

export const TrackAlbumArtwork: FC = () => {
    const {
        album: { name, artwork },
        artist,
    } = useTrack();
    return (
        <img
            className={styles.trackAlbumArtwork}
            src={artwork.url}
            alt={`album artwork for ${name} by ${artist}`}
        />
    );
};
