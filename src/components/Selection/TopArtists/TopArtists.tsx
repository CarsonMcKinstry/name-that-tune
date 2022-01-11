import { ArtistPortrait } from "components/Portrait";
import { FC, useMemo } from "react";

import { useMyTopArtistsQuery } from "./topArtists.hook";

export const TopArtists: FC = () => {
    const { data, loading } = useMyTopArtistsQuery();

    const artists = useMemo(() => {
        const artists = data?.me?.top_artists.artists ?? [];

        return artists.filter((artist) => !!artist.id);
    }, [data]);

    return (
        <div>
            {artists.map((artist) => (
                <ArtistPortrait artistId={artist.id!} key={artist.id} />
            ))}
        </div>
    );
};
