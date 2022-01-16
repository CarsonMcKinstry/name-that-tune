import {
    TrackList,
    TrackRow,
    TrackInfo,
    TrackArtist,
    TrackName,
    TrackAlbumArtwork,
} from "components/TrackList";
import { FC, useMemo } from "react";
import { useMyTopTracksQuery } from "./topTracks.hook";

export const TopTracks: FC = () => {
    const { data } = useMyTopTracksQuery();

    const tracks = useMemo(() => {
        const tracks = data?.me?.top_tracks.tracks ?? [];

        return tracks.filter((track) => !track.is_local);
    }, [data]);

    return (
        <TrackList>
            {tracks.map((track) => (
                <TrackRow trackId={track.id} key={track.id}>
                    <TrackAlbumArtwork />
                    <TrackInfo>
                        <TrackName />
                        <TrackArtist />
                    </TrackInfo>
                </TrackRow>
            ))}
        </TrackList>
    );
};
