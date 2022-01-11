import { FC, useCallback, useState, ChangeEventHandler, useMemo } from "react";
import { debounce } from "lodash";
import { useSearchTracksLazyQuery } from "./searchTracks.hook";
import { Track } from "components/Track";

export const SearchTracks: FC = () => {
    const [search, { data }] = useSearchTracksLazyQuery();
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

    const tracks = useMemo(() => {
        const tracks = data?.searchTracks.tracks ?? [];

        return tracks.filter((track) => !track.is_local);
    }, [data]);

    return (
        <div>
            <input
                placeholder="Search tracks..."
                onChange={handleChange}
                value={value}
            />
            <div>
                {tracks.map((track) => (
                    <Track trackId={track.id} key={track.id} />
                ))}
            </div>
        </div>
    );
};
