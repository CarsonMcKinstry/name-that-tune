import {
    ArtistList,
    ArtistRow,
    ArtistName,
    ArtistPortrait,
} from "components/ArtistList";
import { FC, useMemo } from "react";

import { useMyTopArtistsQuery } from "./topArtists.hook";

interface TopArtistsProps {
    onSelect: (id: string) => void;
}

export const TopArtists: FC<TopArtistsProps> = ({ onSelect }) => {
    const { data } = useMyTopArtistsQuery();

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
