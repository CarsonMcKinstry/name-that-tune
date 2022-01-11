import { FC, useMemo } from "react";
import { useMyTopTracksQuery } from "./topTracks.hook";

export const TopTracks: FC = () => {
    const { data } = useMyTopTracksQuery();

    const tracks = useMemo(() => {
        const tracks = data?.me?.top_tracks.tracks ?? [];

        return tracks.filter((track) => !track.is_local);
    }, [data]);

    return (
        <div>
            <pre>{JSON.stringify(tracks, null, 4)}</pre>
        </div>
    );
};
