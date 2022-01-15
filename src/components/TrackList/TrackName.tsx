import { FC } from "react";
import { useTrack } from "./trackContext";
import styles from "./trackList.module.scss";

export const TrackName: FC = () => {
    const { name } = useTrack();

    return <p className={styles.trackName}>{name}</p>;
};
