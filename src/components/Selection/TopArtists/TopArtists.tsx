import { Artist } from "components/Artist";
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
                <Artist artistId={artist.id!} key={artist.id} />
            ))}
        </div>
    );
};
