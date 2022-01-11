import { ChangeEventHandler, FC, useCallback, useMemo, useState } from "react";
import { useSearchArtistsLazyQuery } from "./searchArtists.hook";
import { debounce } from "lodash";
import { ArtistPortrait } from "components/Portrait";

export const SearchArtists: FC = () => {
    const [search, { data, loading, error }] = useSearchArtistsLazyQuery();
    const [value, setValue] = useState("");

    const performSearch = useCallback(
        debounce((query: string) => {
            search({
                variables: {
                    query,
                },
            });
        }, 300),
        [search]
    );

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
        performSearch(e.target.value);
    };

    const artists = useMemo(() => {
        const artists = data?.searchArtists.artists ?? [];

        return artists.filter((artist) => !!artist.id);
    }, [data]);

    return (
        <div>
            <input
                placeholder="Search artists..."
                onChange={handleChange}
                value={value}
            />
            <div>
                {artists.map((artist) => (
                    <ArtistPortrait artistId={artist.id!} key={artist.id} />
                ))}
            </div>
        </div>
    );
};
