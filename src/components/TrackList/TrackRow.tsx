import { FC } from "react";
import styles from "./trackList.module.scss";

import { TrackProvider } from "./TrackProvider";

interface TrackRowProps {
    trackId: string;
    onClick?: (trackId: string) => void;
}

export const TrackRow: FC<TrackRowProps> = ({ children, trackId, onClick }) => {
    return (
        <TrackProvider trackId={trackId}>
            <li>
                <button
                    onClick={() => {
                        onClick && onClick(trackId);
                    }}
                    className={styles.trackRow}
                >
                    {children}
                </button>
            </li>
        </TrackProvider>
    );
};
