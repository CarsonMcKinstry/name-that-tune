import { ChangeEventHandler, FC, useCallback, useMemo, useState } from "react";
import { useSearchArtistsLazyQuery } from "./searchArtists.hook";
import { debounce } from "lodash";
import { Artist } from "components/Artist";

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
                    <Artist artistId={artist.id!} key={artist.id} />
                ))}
            </div>
        </div>
    );
};
