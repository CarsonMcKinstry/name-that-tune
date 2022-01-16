import { useAudioControls, useAudioState } from "@components/AudioPlayer";
import { FC, useEffect, useRef } from "react";
import { useTrack } from "./trackContext";
export const TrackPreview: FC = () => {
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

    const icon = playing && isCurrentTrack ? "pause" : "play_arrow";

    return (
        <button onClick={togglePreview}>
            <span className="material-icons">{icon}</span>
        </button>
    );
};
