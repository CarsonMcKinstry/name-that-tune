import { DEFAULT_IMAGE } from "@packages/constants";
import { Image } from "@packages/graphql";
import { Nullable } from "@packages/types";
import { createContext, useContext } from "react";

interface ArtistContext {
    id: string;
    name: string;
    image: Image;
}

export const artistContext = createContext<ArtistContext>({
    id: "",
    name: "",
    image: {
        url: DEFAULT_IMAGE,
    },
});

export const useArtist = () => {
    return useContext(artistContext);
};
