import { Nullable } from "@packages/types";
import { createContext, useContext } from "react";

interface AudioPlayerContext {
    playing: boolean;
    source: Nullable<string>;
}

interface AudioPlayerControlContext {
    play: (url: string) => void;
    pause: () => void;
}

const audioPlayerContext = createContext<AudioPlayerContext>({
    playing: false,
    source: null,
});
const audioPlayerControlContext = createContext<AudioPlayerControlContext>({
    play: () => {},
    pause: () => {},
});

export const AudioPlayerProvider = audioPlayerContext.Provider;
export const AudioPlayerControlProvider = audioPlayerControlContext.Provider;

export const useAudioState = () => {
    return useContext(audioPlayerContext);
};

export const useAudioControls = () => {
    return useContext(audioPlayerControlContext);
};
