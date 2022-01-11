import { ArtistPortrait } from 'components/Portrait';
import { FC, useMemo } from 'react';

import { useMyTopArtistsQuery } from './topArtists.hook';

export const TopArtists: FC = () => { 
    const { data, loading } = useMyTopArtistsQuery();

    const artists = useMemo(() => {
        return data?.me?.top_artists.artists ?? [];
    }, [data]);

    return (
        <div>
            {artists.map(artist => <ArtistPortrait {...artist} key={artist.id} />)}
        </div>
    );
}