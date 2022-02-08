import { useAudioControls, useAudioState } from "@components/AudioPlayer";
import { Portal } from "@components/Portal/Portal";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { AlbumArtwork } from "./AlbumArtwork";

import { Header } from "./Header";
import { useRounds } from "./hooks/useRounds";
import { ProgressBar } from "./ProgressBar";
import { Round } from "./Round";
import { GameStart } from "./GameStart";
import { TrackOptions } from "./TrackOptions";
import { RoundData, GameInput } from "./types";
import { createSteps } from "@components/Steps";
import { useTimer } from "@packages/hooks";

interface GameBoardProps extends GameInput {}

const [Steps, Step, useSteps] = createSteps({
    initial: "newGame",
    steps: {
        newGame: ["playing"],
        playing: ["timesUp", "wrongAnswer", "rightAnswer"],
        timesUp: ["playing", "finished"],
        wrongAnswer: ["playing", "finished"],
        rightAnswer: ["playing", "finished"],
        finished: ["newGame"],
    },
});

export const GameBoard: FC<GameBoardProps> = ({ artists, tracks, genre }) => {
    const [step, setStep] = useSteps();

    const { playing: previewPlaying } = useAudioState();
    const audio = useAudioControls();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);

    const [timeElapsed, setTimeElapsed] = useState(0);

    const [startTimer, stopTimer] = useTimer({
        interval: 1000,
        onTick() {
            setTimeElapsed((t) => t + 1);
        },
    });

    const timesUp = useCallback(() => {
        audio.pause();
        stopTimer();
        setStep("timesUp");
        setTimeElapsed(0);
    }, [audio, stopTimer, setStep]);

    useEffect(() => {
        if (timeElapsed >= 30) {
            timesUp();
        }
    }, [timeElapsed, timesUp]);

    // console.log(useRounds({ artists, tracks, genre }));
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
                        id: "12346",
                        name: "Something Something",
                        album: "Somewhere Somewhere",
                        artist: "Someone Someone",
                    },
                    {
                        id: "12347",
                        name: "Something Something",
                        album: "Somewhere Somewhere",
                        artist: "Someone Someone",
                    },
                    {
                        id: "12348",
                        name: "Something Something",
                        album: "Somewhere Somewhere",
                        artist: "Someone Someone",
                    },
                ],
            },
        ];
    }, []);

    function roundStart() {
        audio.play(
            "https://p.scdn.co/mp3-preview/4de2051c5b4ea6c2d61efea11c0c77afa7c668d9?cid=d7f3177ddef646819afe4484cfd956c9"
        );
        startTimer();
    }

    const { track, options } = useMemo(() => {
        return rounds[round];
    }, [rounds, round]);

    function guess(id: string) {
        if (id === track.id) {
            console.log("Winner!");
        } else {
            console.log("Loser!");
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <Header
                round={round + 1}
                rounds={rounds.length}
                score={score}
                onQuit={() => console.log("quit")}
            />
            <Steps state={step}>
                <Step step="newGame">
                    <GameStart
                        onStart={() => {
                            setStep("playing");
                        }}
                        onQuit={() => {
                            console.log("you can never leave");
                        }}
                        rounds={rounds.length}
                        round={round}
                        score={score}
                    />
                </Step>
                <Step step="playing">
                    <p>{timeElapsed}</p>
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
                                    onSelect={(id) => {
                                        guess(id);
                                    }}
                                    options={options}
                                />
                            </>
                        )}
                    </Round>
                </Step>
                <Step step="timesUp">
                    <div className="w-full h-full">
                        <p>Times up!</p>
                    </div>
                </Step>
            </Steps>
        </div>
    );
};
