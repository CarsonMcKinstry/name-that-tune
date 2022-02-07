import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
            }
        },
        [currentSource]
    );

    const pause = useCallback(() => {
        const { current: player } = audioRef;
        if (player) {
            player.pause();
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

    useEffect(() => {
        function playing() {
            setPlaying(true);
        }

        function paused() {
            setPlaying(false);
        }

        if (audioRef.current) {
            audioRef.current.addEventListener("play", playing.bind(this));
            audioRef.current.addEventListener("pause", paused.bind(this));
        }

        return () => {
            if (audioRef.current) {
                audioRef.current?.removeEventListener(
                    "play",
                    playing.bind(this)
                );
                audioRef.current.removeEventListener(
                    "pause",
                    paused.bind(this)
                );
            }
        };
    }, [audioRef]);

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
