import { Track } from "components/Track";
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
            {tracks.map((track) => (
                <Track trackId={track.id} key={track.id} />
            ))}
        </div>
    );
};
