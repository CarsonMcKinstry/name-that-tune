import { FC } from "react";
import { useGetArtistQuery } from "./getArtist.hook";
import { artistContext } from "./artistContext";
import { getLargestImage } from "@packages/utils";

const { Provider } = artistContext;

interface ArtistProviderProps {
    artistId: string;
}

export const ArtistProvider: FC<ArtistProviderProps> = ({
    artistId,
    children,
}) => {
    const { data } = useGetArtistQuery({ variables: { artistId } });

    const { artist } = data ?? {};

    if (!artist) return null;

    const { name, images } = artist;

    const image = getLargestImage(images);

    return (
        <Provider
            value={{
                id: artistId,
                name,
                image,
            }}
        >
            {children}
        </Provider>
    );
};
