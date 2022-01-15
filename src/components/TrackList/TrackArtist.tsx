import { FC } from "react";
import { useTrack } from "./trackContext";
import styles from "./trackList.module.scss";

export const TrackArtist: FC = () => {
    const { artist } = useTrack();

    return <p className={styles.trackArtist}>{artist}</p>;
};
