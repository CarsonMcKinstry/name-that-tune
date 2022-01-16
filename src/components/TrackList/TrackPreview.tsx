import { useAudioControls, useAudioState } from "@components/AudioPlayer";
import { FC, useEffect, useRef } from "react";
import { useTrack } from "./trackContext";

import styles from "./trackList.module.scss";

export const TrackPreview: FC = ({ children }) => {
    const { previewUrl } = useTrack();
    const { playing, source } = useAudioState();
    const { play, pause } = useAudioControls();

    if (!previewUrl) return null;

    const isCurrentTrack = source === previewUrl;

    const togglePreview = () => {
        if (!playing || !isCurrentTrack) {
            play(previewUrl);
        } else {
            pause();
        }
    };

    return (
        <button className={styles.trackPlayToggle} onClick={togglePreview}>
            {isCurrentTrack && playing && (
                <span className={`material-icons ${styles.pause}`}>
                    pause_circle_filled
                </span>
            )}
            {children}
        </button>
    );
};
