import { useQuery } from '@apollo/client';
import { Artists } from '@packages/graphql';
import { FC, useMemo } from 'react';

import query from './topArtists.graphql';
import { useTopArtistsQuery } from './topArtists.hook';

export const TopArtists: FC = () => { 
    const { data, loading } = useTopArtistsQuery();

    const artists = useMemo(() => {
        return loading ? [] : data?.me?.top_artists.artists ?? [];
    }, [data, loading])

    return (
        <pre>
            { JSON.stringify(artists, null, 2) }
        </pre>
    );
}