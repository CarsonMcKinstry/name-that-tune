import { useAudioControls, useAudioState } from "@components/AudioPlayer";
import { FC, useMemo, useState } from "react";
import { AlbumArtwork } from "./AlbumArtwork";
import { Header } from "./Header";
import { ProgressBar } from "./ProgressBar";
import { Round } from "./Round";
import { TrackOptions } from "./TrackOptions";
import { RoundData } from "./types";

interface GameBoardProps {
    artists: [string] | [string, string];
    tracks: [string] | [string, string];
    genre: string;
}

interface RoundStartProps {
    onClick: () => void;
    score: number;
    round: number;
    rounds: number;
}

const RoundStart: FC<RoundStartProps> = ({ onClick, score, round, rounds }) => {
    return (
        <div>
            <button onClick={onClick}>Start</button>
        </div>
    );
};

export const GameBoard: FC<GameBoardProps> = ({ artists, tracks, genre }) => {
    const { playing: previewPlaying } = useAudioState();
    const [playing, setPlaying] = useState(false);
    const { play } = useAudioControls();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);

    const rounds: RoundData[] = useMemo(() => {
        return [
            {
                track: {
                    id: "12345",
                    name: "Something Something",
                    album: "Somewhere Somewhere",
                    artist: "Someone Someone",
                    preview: "",
                    albumArtwork: "https://placeimg.com/640/640/any",
                },
                options: [
                    {
                        id: "12345",
                        name: "Something Something",
                        album: "Somewhere Somewhere",
                        artist: "Someone Someone",
                    },
                    {
                        id: "12345",
                        name: "Something Something",
                        album: "Somewhere Somewhere",
                        artist: "Someone Someone",
                    },
                    {
                        id: "12345",
                        name: "Something Something",
                        album: "Somewhere Somewhere",
                        artist: "Someone Someone",
                    },
                    {
                        id: "12345",
                        name: "Something Something",
                        album: "Somewhere Somewhere",
                        artist: "Someone Someone",
                    },
                ],
            },
        ];
    }, []);

    function roundStart() {
        play(
            "https://p.scdn.co/mp3-preview/4de2051c5b4ea6c2d61efea11c0c77afa7c668d9?cid=d7f3177ddef646819afe4484cfd956c9"
        );
    }

    const { track, options } = useMemo(() => {
        return rounds[round];
    }, [rounds, round]);

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <Header
                round={round + 1}
                rounds={rounds.length}
                score={score}
                onQuit={() => console.log("quit")}
            />
            {playing ? (
                <Round>
                    <AlbumArtwork
                        playing={previewPlaying}
                        url={track.albumArtwork}
                        onLoad={() => {
                            setImageLoaded(true);
                            roundStart();
                        }}
                    />
                    {imageLoaded && (
                        <>
                            <ProgressBar playing={previewPlaying} />
                            <TrackOptions
                                onSelect={(id) => console.log(id)}
                                options={options}
                            />
                        </>
                    )}
                </Round>
            ) : (
                <RoundStart
                    onClick={() => {
                        setPlaying(true);
                    }}
                    rounds={rounds.length}
                    round={round}
                    score={score}
                />
            )}
        </div>
    );
};
