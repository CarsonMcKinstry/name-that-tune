import { createContext, useContext } from "react";
import { Nullable } from "@packages/types";
import { Image } from "@packages/graphql";
import { DEFAULT_IMAGE } from "@packages/constants";

interface TrackContext {
    artist: string;
    album: {
        artwork: Image;
        name: string;
    };
    id: string;
    name: string;
    previewUrl: Nullable<string>;
}

export const trackContext = createContext<TrackContext>({
    artist: "",
    album: {
        artwork: {
            url: DEFAULT_IMAGE,
        },
        name: "",
    },
    id: "",
    name: "",
    previewUrl: null,
});

export const useTrack = () => {
    return useContext(trackContext);
};
