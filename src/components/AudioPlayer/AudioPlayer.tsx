import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useAudioState } from ".";
import {
    AudioPlayerControlProvider,
    AudioPlayerProvider,
} from "./audioPlayerContext";

export const AudioPlayer: FC = ({ children }) => {
    const [currentSource, setCurrentSource] = useState("");
    const [playing, setPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    const play = useCallback(
        (url: string) => {
            const { current: player } = audioRef;
            if (player) {
                if (currentSource !== url) {
                    player.src = url;
                    setCurrentSource(url);
                }

                player.play();
                setPlaying(true);
            }
        },
        [currentSource]
    );

    const pause = useCallback(() => {
        const { current: player } = audioRef;
        if (player) {
            player.pause();
            setPlaying(false);
        }
    }, []);

    const playerState = useMemo(
        () => ({
            source: currentSource,
            playing,
        }),
        [playing, currentSource]
    );

    const controls = useMemo(
        () => ({
            play,
            pause,
        }),
        [play, pause]
    );

    return (
        <>
            <audio ref={audioRef} />
            <AudioPlayerProvider value={playerState}>
                <AudioPlayerControlProvider value={controls}>
                    {children}
                </AudioPlayerControlProvider>
            </AudioPlayerProvider>
        </>
    );
};
