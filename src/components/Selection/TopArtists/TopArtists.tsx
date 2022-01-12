import {
    ArtistList,
    ArtistRow,
    ArtistName,
    ArtistPortrait,
} from "components/ArtistList";
import { FC, useMemo } from "react";

import { useMyTopArtistsQuery } from "./topArtists.hook";

export const TopArtists: FC = () => {
    const { data, loading } = useMyTopArtistsQuery();

    const artists = useMemo(() => {
        const artists = data?.me?.top_artists.artists ?? [];

        return artists.filter((artist) => !!artist.id);
    }, [data]);

    return (
        <ArtistList>
            {artists.map(({ id }) => (
                <ArtistRow artistId={id!} key={id}>
                    <ArtistPortrait />
                    <ArtistName />
                </ArtistRow>
            ))}
        </ArtistList>
    );
};
