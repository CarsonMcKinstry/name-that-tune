import { FC } from "react";
import styles from "./trackList.module.scss";

export const TrackInfo: FC = ({ children }) => {
    return <div className={styles.trackInfo}>{children}</div>;
};
