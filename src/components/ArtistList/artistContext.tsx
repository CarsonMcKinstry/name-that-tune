import { Image } from "@packages/graphql";
import { Nullable } from "@packages/types";
import { createContext, useContext } from "react";

import { GetArtistQuery } from "./getArtist.hook";

type Artist = GetArtistQuery["artist"];

interface ArtistContext {
    name: string;
    image: Image;
}

export const artistContext = createContext<Nullable<ArtistContext>>(null);

export const useArtist = () => {
    return useContext(artistContext);
};
