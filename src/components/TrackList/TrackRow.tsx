import { FC } from "react";
import styles from "./trackList.module.scss";
import { TrackPreview } from "./TrackPreview";

import { TrackProvider } from "./TrackProvider";

interface TrackRowProps {
    trackId: string;
}

export const TrackRow: FC<TrackRowProps> = ({ children, trackId }) => {
    return (
        <TrackProvider trackId={trackId}>
            <li className={styles.trackRow}>
                <TrackPreview>{children}</TrackPreview>
            </li>
        </TrackProvider>
    );
};
